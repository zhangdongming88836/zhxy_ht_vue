<template>
  <div>
    <el-form :model="data" :inline="true" class="demo-form-inline" ref="data">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="data.roleName" placeholder="角色名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
      </template>
    </Table>
    <RoleAddition :RoleAddition.sync="data.RoleAddition"></RoleAddition>
    <RoleEditor
      :RoleEditData="data.RoleEditData"
      :RoleEditingSwitch.sync="data.RoleEditingSwitch"
    ></RoleEditor>
  </div>
</template>
<script>
//引入vue3.0 的API
import {
  reactive,
  watchEffect,
  watch,
  onBeforeMount,
} from "@vue/composition-api";
//引入编辑组件
import RoleEditor from "@/components/RoleManagement/RoleEditor/index.vue";
//引入公共表格的组件
import Table from "@/components/table/index.vue";
//引入添加组件
import RoleAddition from "@/components/RoleManagement/RoleAddition/index.vue";
//引入角色api
import { RoleList,RoleDelete } from "@/api/role.js";
//引入时间戳
import dateFormat from "@/utils/common.js";
export default {
  name: "userManagement",
  components: {
    Table,
    RoleAddition,
    RoleEditor,
  },
  setup(props, context) {
    const data = reactive({
      //总页数
      total: null,
      //每页的条数
      pageSize: 10,
      //当前页数
      currentPage: 1,
      //搜索用户名的变量
      roleName: "",
      //添加框启禁开关的变量
      RoleAddition: false,
      //编辑框启禁开关的变量
      RoleEditingSwitch: false,
      //传入要在编辑框显示的数据
      RoleEditData: {},
      //传入公共组件表格的整体数据
      configTable: {
        //多选框的显示
        selection: false,
        //表格的头部数据
        tableHeader: [
          { lable: "角色名称", field: "roleName" },
          { lable: "权限字符", field: "roleKey" },
          { lable: "状态", field: "status" },
          { lable: "创建人", field: "createName" },
          { lable: "创建时间", field: "createTime" },
          { lable: "操作", typeRow: "slot", slotName: "status" },
        ],
        //表格内容的数据
        tableData: [
          {
            roleName: 0 == 0 ? "男" : "女",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: !1 ? "男" : "女",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: !1 ? "男" : "女",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: !1 ? "男" : "女",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      },
    });
    //方法区域相当于2.0的methods
    //用户管理删除角色
    const DeleteRole = (val) => {
      context.root
        .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          var formdata = new FormData();
          formdata.append("roleId", val.roleId);
          RoleDelete(formdata).then((response) => {
            console.log(response);
            if (response.data.code === 200 || response.data.code === 500) {
              context.root.$message({
                type: "success",
                message: `${response.data.msg}`,
              });
              RoleData()
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
      data.RoleEditData = value;
      data.RoleEditingSwitch = true;
    };
    //搜索角色方法
    const SearchRoles = () => {
      RoleData()
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
      data.RoleAddition = true;
    };
    /***********************************页码*************************************************** */
    //每页条数方法
    const strip = (val) => {
      data.pageSize = val;
    };
    //当前页数方法
    const page = (val) => {
      console.log(val)
      data.currentPage = val;
    };
    //监听页码变化发送请求
    watch(
      [() => data.pageSize, () => data.currentPage],
      ([currentPage, pageSize]) => {
        RoleData()
      }
    );
    //生命周期挂在前调用获取用户接口
    onBeforeMount(() => {
     RoleData()
    });
    //封装角色获取数据
    const RoleData = () =>{
        let obj = {
        roleName: data.roleName,
        pageNum: data.currentPage,
        pageSize: data.pageSize,
      };
      RoleList(obj).then((response) => {
        Callback(response)
      });
    }
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
    return {
      data,
      DeleteRole, //抛出用户管理删除角色
      EditingRoles, //抛出用户管理编辑角色
      ResetUserList,
      newlyAdded,
      strip,
      page,
      SearchRoles,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>