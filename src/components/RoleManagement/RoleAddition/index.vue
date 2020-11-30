<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="data.RoleAddition"
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
              <el-form-item label="角色名称：" prop="roleName">
                <el-input v-model="data.ruleForm.roleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权限字符：" prop="roleKey">
                <el-input v-model="data.ruleForm.roleKey"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="block"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="状态：" prop="status">
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
              <el-form-item label="权限配置："> </el-form-item>
              <el-tree
                :data="data.treea"
                show-checkbox
                node-key="id"
                ref="tree"
                :props="data.defaultProps"
                accordion
                highlight-current
              >
              </el-tree>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Addrole('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch, isRef } from "@vue/composition-api";
//引入角色api
import { RoleList, RoleDelete, TreeData, UserInsert } from "@/api/role.js";
//引入正则api
import { calidateUser } from "@/utils/verification.js";
export default {
  props: {
    RoleAddition: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("角色不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("权限字符不能为空"));
      } else if (!calidateUser(value)) {
        callback(new Error("3~18的字母数字"));
      } else {
        callback();
      }
    };
    const data = reactive({
      //弹窗启禁开关的变量
      RoleAddition: false,
      ruleForm: {
        //角色名称
        roleName: "",
        //权限字符
        roleKey: "",
        //状态
        status: "0",
      },
      rules: {
        roleName: [{ validator: checkAge, trigger: "blur" }],
        roleKey: [{ validator: validatePass, trigger: "blur" }],
      },
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
      //传入后台选中权限的数组
      trees: [],
      //树数据
      treea: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    });
    /**********************树数据方法***************************** */

    /********************************************************* */
    //确定发送添加角色
    const Addrole = (formName) => {
      let arr = [].concat(
        context.refs.tree.getHalfCheckedKeys(),
        context.refs.tree.getCheckedKeys()
      );
      context.refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            roleName: data.ruleForm.roleName,
            roleKey: data.ruleForm.roleKey,
            status: data.ruleForm.status,
            menuIds: arr,
          };
          UserInsert(obj).then((response) => {
            console.log(response);
            if (response.data.code === 200) {
              context.root.$message({
                message: `${response.data.msg}`,
                type: "success",
              });
            }else{
              context.root.$message({
                message: `${response.data.msg}`,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    watch(
      () => props.RoleAddition,
      (value) => {
        data.RoleAddition = value;
      }
    );
    const close = () => {
      context.emit("update:RoleAddition", data.RoleAddition);
    };
    //打开弹窗的时候后去树数据
    const open = () => {
      TreeData().then((response) => {
        console.log(response);
        data.treea = response.data.data;
      });
    };
    return {
      data,
      close,
      open,
      Addrole,
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