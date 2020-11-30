<template>
  <div>
    <el-form :model="data" :inline="true" class="demo-form-inline" ref="data">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名称" prop="name">
            <el-input v-model="data.userName" placeholder="用户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始日期" prop="startDate">
            <el-date-picker
              v-model="data.value1"
              value-format="yyyy-MM-dd"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker
              v-model="data.value2"
              value-format="yyyy-MM-dd"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
             <el-col :span="7">
          <el-form-item>
            <el-button type="primary" @click="SearchRoles()">搜索</el-button>
            <el-button type="primary" @click="ResetUserList()">重置</el-button>
            <el-button type="primary" @click="newlyAdded()">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 引入公共的表格组件 组件在components>table>index.vue -->
    <Table
      :configTable="data.configTable"
      @strip="strip"
      @page="page"
      :total="data.total"
    >
      <!-- 子组件的 按钮 slot -->
      <template v-slot:status="data">
        <el-button type="danger" size="medium" @click="DeleteRole(data.data)"
          >删除</el-button
        >
        <el-button type="success" size="medium" @click="EditingRoles(data.data)"
          >编辑</el-button
        >
        <el-button type="success" size="medium" @click="resetRassword(data.data)"
          >重置密码</el-button
        >
      </template>
    </Table>
    <UserPopUpWindow
      :switch.sync="data.switch"
      @obtain="obtain"
    ></UserPopUpWindow>
    <UserEditing
      :edit.sync="data.edit"
      :edits="data.edits"
      @obtain="obtain"
    ></UserEditing>
  <resetPassword :ResetPasswordSwitch.sync="data.ResetPasswordSwitch" :resetId="data.resetId"></resetPassword>
  </div>
</template>
<script>
//引入vue3.0 的API
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
//引入公共表格的组件
import Table from "@/components/table/index.vue";
//引入添加组件
import UserPopUpWindow from "@/components/userManagement/UserAdd/index.vue";
//引入编辑组件
import UserEditing from "@/components/userManagement/UserEditing/index.vue";
//引入重置密码组件
import resetPassword from "@/components/userManagement/resetPassword";
//引入获取添加角色列表API
import { userManagement,UserToInsert, UserDelete  } from "@/api/console.js";
import { timestampToTime } from "@/utils/timeStamp.js";
//引入时间戳
import dateFormat from "@/utils/common.js";
export default {
  name: "Reset",
  components: {
    Table,
    UserPopUpWindow,
    UserEditing,
    resetPassword
  },
  setup(props, context) {
    const data = reactive({
      //传入子组件角色的数组
      //  roles:[],
      //总页数
      total: null,
      //每页的条数
      pageSize: 10,
      //当前页数
      currentPage: 1,
      //开始的日期变量
      value1: "",
      //结束的日期变量
      value2: "",
      //搜索用户名的变量
      userName: "",
      //添加框启禁开关的变量
      switch: false,
      //编辑框启禁的变量
      edit: false,
      //重置密码开关变量
      ResetPasswordSwitch:false,
      //重置密码的id
      resetId:"",
      //传入编辑的数据
      edits: {},
      //传入公共组件表格的整体数据
      configTable: {
        //多选框的显示
        selection: false,
        //表格的头部数据
        tableHeader: [
          { lable: "账号", field: "loginName" },
          { lable: "姓名", field: "userName" },
          { lable: "性别", field: "sex" },
          { lable: "手机号", field: "phonenumber" },
          { lable: "年龄", field: "age" },
          { lable: "状态", field: "status" },
          { lable: "创建日期", field: "createTime" },
          { lable: "操作", typeRow: "slot", slotName: "status" },
        ],
        //表格内容的数据
        tableData: [
          // {
          //   date: 0 == 0 ? "男" : "女",
          //   name: "王小虎",
          //   address: "上海市普陀区金沙江路 1518 弄",
          // },
          // {
          //   date: !1 ? "男" : "女",
          //   name: "王小虎",
          //   address: "上海市普陀区金沙江路 1517 弄",
          // },
          // {
          //   date: !1 ? "男" : "女",
          //   name: "王小虎",
          //   address: "上海市普陀区金沙江路 1519 弄",
          // },
          // {
          //   date: !1 ? "男" : "女",
          //   name: "王小虎",
          //   address: "上海市普陀区金沙江路 1516 弄",
          // },
        ],
      },
    });
    //方法区域相当于2.0的methods
    //用户管理删除角色 //删除用户区域/**************************************************************************** */
    const DeleteRole = (val) => {
      context.root
        .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          var formdata = new FormData();
          formdata.append("userId", val.userId);
          UserDelete(formdata).then((response) => {
            console.log(response);
            if (response.data.code === 200 || response.data.code === 500) {
              context.root.$message({
                type: "success",
                message: `${response.data.msg}`,
              });
              obtain();
            }
          });
        })
        .catch(() => {
          context.root.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    //用户管理编辑角色
    const EditingRoles = (value) => {
      data.edits = value;
      data.edit = true;
    };
    //搜索角色方法
    const SearchRoles = () => {
     obtain();
    };
    //重置用户列表
    const ResetUserList = () => {
      //重置搜索框表单
      data.userName = "";
      data.value1 = "";
      data.value2 = "";
    };
    //添加框按钮的启禁方法
    const newlyAdded = () => {
      // UserToInsert().then(response => {
      //   data.roles = response.data.data;
      // })
      data.switch = true;
    };
    //每页条数方法
    const strip = (val) => {
      data.pageSize = val;
    };
    //当前页数方法
    const page = (val) => {
      data.currentPage = val;
    };
    //监听页码变化发送请求
    watch(
      [() => data.pageSize, () => data.currentPage],
      ([currentPage, pageSize]) => {
       obtain();
      }
    );
    //生命周期挂在前调用获取用户接口
    onBeforeMount(() => {
      obtain();
    });
    //封装获取用户列表信息
    const obtain = () => {
      let obj = {
        userName: data.userName,
        beginTime: data.value1,
        endTime: data.value2,
        pageNum: data.currentPage,
        pageSize: data.pageSize,
      };

      userManagement(obj).then((response) => {
        Callback(response);
      });
    };
    //封装回调数据改变时间格式
    const Callback = (response) => {
      data.total = response.data.total;
      let arr = response.data.rows;
      for (let i = 0; i < arr.length; i++) {
        arr[i].sex == 0 ? (arr[i].sex = "男") : (arr[i].sex = "女");
        let date = new Date(arr[i].createTime);
        arr[i].createTime = dateFormat.formatDate(date, "yyyy-MM-dd hh:mm");
        arr[i].status == 1
          ? (arr[i].status = "停用")
          : (arr[i].status = "启用");
      }
      data.configTable.tableData = arr;
    };
    /*********************重置密码*************************** */
    const resetRassword = (val) =>{
       data.resetId = val.userId;
       data.ResetPasswordSwitch = true;
    }
    return {
      data,
      DeleteRole, //抛出用户管理删除角色
      EditingRoles, //抛出用户管理编辑角色
      ResetUserList,
      newlyAdded,
      SearchRoles,
      strip,
      page,
      obtain,
      resetRassword,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>