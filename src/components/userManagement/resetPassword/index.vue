<template>
  <div>
    <el-dialog
      title="重置密码"
      :visible.sync="data.ResetPasswordSwitch"
      center
      :modal-append-to-body="false"
      @close="close"
    >
      <el-form
        :model="data.ruleForm"
        status-icon
        :rules="data.rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="text"
            v-model="data.ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="block"></div>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="text"
            v-model="data.ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="block"></div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
//引入获取添加角色列表API
import { resetPasser } from "@/api/console.js";
//引入正则
import { calidatePassword, stripscript } from "@/utils/verification.js";
export default {
  props: {
    ResetPasswordSwitch: {
      type: Boolean,
      default: false,
    },
    resetId: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    var validatePass = (rule, value, callback) => {
      data.ruleForm.pass = stripscript(value);
      value = data.ruleForm.pass;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!calidatePassword(value)) {
        callback(new Error("格式是字母和数字"));
      } else {
        if (data.ruleForm.checkPass !== "") {
          context.refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      data.ruleForm.checkPass = stripscript(value);
      value = data.ruleForm.checkPass;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== data.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const data = reactive({
      ResetPasswordSwitch: false,
      resetId: "",
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    });

    const submitForm = (formName) => {
      context.refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            userId: data.resetId,
            password: data.ruleForm.checkPass,
          };
          resetPasser(obj).then((response) => {
            if (response.data.code === 200) {
              context.root.$message({
                showClose: true,
                message: `${response.data.msg}`,
                type: "success",
              });
              data.ResetPasswordSwitch = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    watch(
      () => props.ResetPasswordSwitch,
      (value) => {
        data.ResetPasswordSwitch = value;
      }
    );
    watch(
      () => props.resetId,
      (val) => {
        data.resetId = val;
      }
    );
    //关闭对话框
    const close = () => {
      context.emit("update:ResetPasswordSwitch", data.ResetPasswordSwitch);
    };

    return {
      data,
      close,
      submitForm,
    };
  },
};
</script>
<style lang="scss" scoped>
.enter {
  width: 400px;
  margin: 0 auto;
}
.block {
  margin-top: 20px;
}
</style>