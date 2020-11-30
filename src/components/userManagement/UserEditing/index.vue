<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="data.edit"
      center
      :modal-append-to-body="false"
      @close="close"
      @open="open"
    >
      <div class="enter">
        <el-form
          :model="data.ruleForm"
          status-icon
          :rules="data.rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="登录账号：" prop="loginName">
                <el-input
                  v-model="data.ruleForm.loginName"
                  @change="change"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户昵称：" prop="userName">
                <el-input v-model="data.ruleForm.userName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="block"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户邮箱：" prop="email">
                <el-input v-model="data.ruleForm.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码：" prop="phonenumber">
                <el-input
                  v-model="data.ruleForm.phonenumber"
                  maxlength="11"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="block"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年龄：" prop="age">
                <el-input v-model="data.ruleForm.age" maxlength="2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户性别：" prop="sex">
                <el-select v-model="data.ruleForm.sex" placeholder="请选择">
                  <el-option
                    v-for="item in data.SexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="block"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="账号状态：" prop="account">
                <el-select v-model="data.ruleForm.status" placeholder="请选择">
                  <el-option
                    v-for="item in data.AccountOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色：" prop="role">
                <el-select v-model="data.ruleForm.roleId" placeholder="请选择">
                  <el-option
                    v-for="item in data.RoleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modify('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, reactive, watch } from "@vue/composition-api";
//引入获取添加角色列表API
import {
  UserToInsert,
  userInsert,
  VerifyUser,
  userEdit,
  UserUpdate,
  userManagement
} from "@/api/console.js";
//引入正则
import {
  stripscript,
  calidateUser,
  calidatePassword,
  calidateEmail,
  calidatePhone,
  calidateage,
} from "@/utils/verification.js";
export default {
  name: "UserPopUpWindow",
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    edits: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    /**************************************** */
    var validateLoginName = (rule, value, callback) => {
      data.ruleForm.loginName = stripscript(value);
      value = data.ruleForm.loginName;

      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else if (!calidateUser(value)) {
        return callback(new Error("3~18字母或数字"));
      } else {
        callback();
      }
    };
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("邮箱不能为空"));
      } else if (!calidateEmail(value)) {
        return callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validatePhonenumber = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("手机号不能为空"));
      } else if (!calidatePhone(value)) {
        return callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    var validatEage = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("年龄不能为空"));
      } else if (!calidateage(value)) {
        return callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };

    /****************************************** */

    const data = reactive({
      //弹窗启禁开关的变量
      edit: false,
      ruleForm: {
        loginName: "",
        userName: "",
        email: "",
        phonenumber: "",
        age: "",
        sex: "",
        status: "",
        roleId: "",
      },
      /************************************* */
      rules: {
        loginName: [{ validator: validateLoginName, trigger: "blur" }],
        userName: [{ validator: validateUserName, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        phonenumber: [{ validator: validatePhonenumber, trigger: "blur" }],
        age: [{ validator: validatEage, trigger: "blur" }],
      },
      /********************************** */
      //性别数组
      SexOptions: [
        {
          value: "0",
          label: "男",
        },
        {
          value: "1",
          label: "女",
        },
      ],
      //账号状态数组
      AccountOptions: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "停用",
        },
      ],
      //角色数组
      RoleOptions: [
        {
          value: "1",
          label: "学生",
        },
        {
          value: "2",
          label: "老师",
        },
        {
          value: "3",
          label: "管理员",
        },
      ],
    });
    /**************************************** */
    //提交创建的用户
    const modify = (formName) => {
      context.refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            loginName: data.ruleForm.loginName,
            userName: data.ruleForm.userName,
            email: data.ruleForm.email,
            phonenumber: data.ruleForm.phonenumber,
            age: data.ruleForm.age,
            userId: props.edits.userId,
            sex: data.ruleForm.sex,
            status: data.ruleForm.status,
            roleId: data.ruleForm.roleId,
          };
          UserUpdate(obj).then((response) => {
            if (response.data.code == 200) {
              data.edit = false;
              context.root.$message({
                message: `${response.data.msg}`,
                type: "success",
              });
              context.emit("obtain")
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    /************************************** */
    //inpute失去焦点触发
    const change = () => {
      if (data.ruleForm.loginName == "") {
        return false;
      }
       console.log(data.ruleForm.loginName)

        let obj = {
        LoginName: data.ruleForm.loginName,
        userId:data.ruleForm.userId
      };
      VerifyUser(obj).then((response) => {
        if (response.data.code == 500) {
          context.root.$message.error(`${response.data.msg}`);
          data.ruleForm.loginName = "";
        }
      });
    };

    watch(
      () => props.edit,
      (value) => {
        data.edit = value;
      }
    );
    onMounted(()=>{
      
    })
    //打开对话框
    const open = () => {
      let Edits = props.edits;
      let obj = {
        userId: Edits.userId,
      };
      userEdit(obj).then((response) => {
        data.RoleOptions = response.data.data.roles;
        data.ruleForm = response.data.data.user;
        console.log( data.ruleForm )
      });
    };
    //关闭对话框
    const close = () => {
      context.emit("update:edit", data.edit);
    };
    return {
      data,
      close,
      open,
      change,
      modify,
    };
  },
};
</script>
<style lang="scss" scoped>
.enter {
  width: 400px;
  margin: 0 auto;
}
</style>