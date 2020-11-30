<template>
  <div id="login_wrap">
    <div class="login-form">
      <h2 class="login-font">智慧校园--云教学平台</h2>
      <h3 class="login-shanglian">欢迎使用智慧校园--云教学平台</h3>
      <div class="login-input-bg">
        <div class="login-input-clock">
          <!-- 引入的element-ui   form -->
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            size="medium"
          >
            <el-form-item prop="user">
              <el-input
                type="text"
                v-model="ruleForm.user"
                autocomplete="off"
                class="login-form-input-width"
                maxlength="18"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                class="login-form-input-width"
                maxlength="18"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-row :gutter="11">
                <el-col :span="15">
                  <el-input
                    type="text"
                    v-model="ruleForm.code"
                    autocomplete="off"
                    class="login-form-input-Towidth"
                    maxlength="4"
                  ></el-input>
                </el-col>
                <el-col :span="9">
                  <img
                    :src="ruleForm.imgCode"
                    alt=""
                    class="clock "
                    @click="Code"
                  />
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="login-btn "
                @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <!-- element-ui  结束 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  calidateUser,
  calidatePassword
} from "@/utils/verification.js";
import { Hcode, Login , Logout} from "@/api/login.js";
import {setToken,} from "@/utils/cookie.js"
export default {
  name: "login",
  data() {
    var validateUser = (rule, value, callback) => {
      //验证里的过滤方法先把用户名过滤
      this.ruleForm.user = stripscript(value);
      value = this.ruleForm.user;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!calidateUser(value)) {
        callback(new Error("格式错误3~18位"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      //过滤密码
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!calidatePassword(value)) {
        callback(new Error("最少6位字母+数字"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "zdm",
        password: "123456",
        code: "",
        imgCode: "",
        uuid: ""
      },
      rules: {
        user: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    //获取验证码
    Code() {
      const uuid =  Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
      this.ruleForm.uuid = uuid 
      var num = Math.ceil(Math.random() * 10); //生成一个随机数（防止缓存）
      this.ruleForm.imgCode = "http://192.168.10.68:8087/web/check/"+ this.ruleForm.uuid + "?" + num;
      console.log(this.ruleForm.uuid )
    },
    //登录的api
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //向后端传字符串数据所以用的  FromData
        var formdata = new FormData();
        formdata.append("loginName", this.ruleForm.user);
        formdata.append("password", this.ruleForm.password);
        formdata.append("yzm", this.ruleForm.code);
        formdata.append("uuid", this.ruleForm.uuid);
        Login(formdata).then(response => {
         
          let responseData = response.data;
          
          setToken(response.data.data);
          if (responseData.code == 200) {
           
            this.$message({
              message: `${responseData.msg}`,
              type: "success"
            });
           this.$router.push({ path: "/console" });
          }else{
             this.$message.error(`${responseData.msg}`);
          }
        });
        if (valid) {
          //alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created(){
      const uuid =  Number(Math.random().toString().substr(3,length) + Date.now()).toString(36); 
      this.ruleForm.uuid = uuid
      this.ruleForm.imgCode = "http://192.168.10.68:8087/web/check/" + this.ruleForm.uuid ;
  },
    //关闭浏览器监听
  //   mounted () {
  //   window.onbeforeunload = function(e){
  //       var duration = Logout();

  //       request(duration);
  //   };
  // },
};
</script>
<style lang='scss' scoped>
@import "../../styles/login.scss";
//整个的登录页面背景图片样式
#login_wrap {
  height: 100vh;
  text-align: center;
  background: url("../../assets/login_img/login_bg.jpg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}
//form整个的块级样式
.login-form {
  width: 395px;
  margin: 0 auto;
  padding-top: 100px;
}
// 字体------智慧校园--云教学平台标签样式
.login-font {
  padding-bottom: 30px;
  font-family: $typeface;
  font-size: 40px;
  color: #e6e6e6;
}
// 字体---欢迎使用智慧校园--云教学平台 的标签样式
.login-shanglian {
  width: 360px;
  margin: auto;
  font-family: $typeface;
  font-size: 16px;
  color: #fff;
  border-radius: 5px 5px 0 0;
  line-height: 50px;
  background-color: #008cff;
}
//input背景的样式+整体位置
.login-input-bg {
  width: 360px;
  margin: 0 auto;
  border-radius: 0 0 5px 5px;
  background-color: rgba(255, 255, 255, 0.3);
}
.login-input-clock {
  width: 300px;
  margin: 0 auto;
}
//imput用户名密码样式
.login-form-input-width {
  width: 100%;
  margin-top: 30px;
}
//input验证码样式
.login-form-input-Towidth {
  margin-top: 20px;
}
//登录按钮样式
.login-btn {
  display: block;
  width: 100%;
  background-color: #18a689;
  margin: 20px auto;
}
//验证图片的样式
.clock {
  display: block;
  margin-top: 22px;
  width: 100%;
  cursor: pointer;
}
</style>