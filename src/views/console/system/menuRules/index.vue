<template>
  <div>
    <el-form :model="data" :inline="true" class="demo-form-inline" ref="data">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="data.userName" placeholder="菜单名称"></el-input>
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
    <div class="btna"></div>
    <!-- 表格 -->
    <el-table
      :data="data.tableData"
      style="width:100%; "
      row-key="menuId"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="menuName" label="菜单名称" align="center">
      </el-table-column>
      <el-table-column prop="url" label="请求地址" align="center">
      </el-table-column>
      <el-table-column prop="menuType" label="菜单类型" align="center">
      </el-table-column>
      <el-table-column prop="visible" label="菜单状态" align="center">
      </el-table-column>
      <el-table-column prop="perms" label="权限标识" align="center">
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" >
        <template slot-scope="scope">
          <el-button type="danger" size="small " @click="DeleteBtn(scope.row)"
            >删除</el-button
          >
          <el-button type="success" size="small " @click="MenuEditing(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block"></div>
    <MenuEditing
      :MenuEditSwitch.sync="data.MenuEditSwitch"
      :MenuEditData="data.MenuEditData"
      @menuList="menuList"
    ></MenuEditing>
  </div>
</template>
<script>
//引入vue3.0 的API
import { onBeforeMount, reactive, watchEffect } from "@vue/composition-api";
//引入编辑组件
import MenuEditing from "@/components/MenuRules/MenuEditing/index.vue";
import { MenuList, MenuDelete } from "@/api/MenuManagement.js";
export default {
  name: "userManagement",
  components: {
    MenuEditing,
  },
  setup(props, context) {
    const data = reactive({
      //搜索用户名的变量
      userName: "",

      //编辑框启禁开关的变量
      MenuEditSwitch: false,
      //传入要在编辑框显示的数据
      MenuEditData: {},
      //表格的数据
      tableData: [
        {
          id: 3,
          menuName: "2016-05-01",
          url: "王小虎",
          menuType: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              menuName: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                {
                  id: 32,
                  menuName: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                },
              ],
            },
          ],
        },
      ],
    });
    //方法区域相当于2.0的methods
    //菜单管理编辑
    const MenuEditing = (value) => {
      data.MenuEditData = value;
      data.MenuEditSwitch = true;
    };
    //搜索角色方法
    const SearchRoles = () => {
      menuList();
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
      context.root.$router.push({ path: "/addMenu" });
    };
    //封装获取数据的方法
    const menuList = () => {
       let obj = {
        menuName: data.userName,
      };
      MenuList(obj).then((response) => {
        console.log(response.data.rows);
        let arr = response.data.rows;
        foras(arr);
        data.tableData = arr;
      });
    };
    const foras = (val) => {
      var arr = val;
      for (var i = 0; i < val.length; i++) {
        arr[i].menuType == "M"
          ? (arr[i].menuType = "目录")
          : arr[i].menuType == "C"
          ? (arr[i].menuType = "菜单")
          : (arr[i].menuType = "按钮");
        arr[i].visible == "0"
          ? (arr[i].visible = "显示")
          : (arr[i].visible = "隐藏");
        if (Array.isArray(arr[i].children)) {
          foras(arr[i].children);
        }
      }
      return arr;
    };
    //渲染的时候请求数据
    onBeforeMount(() => {
   
      menuList();
    });
    /************删除************** */
    const DeleteBtn = (val) => {
      context.root
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          var formdata = new FormData();
          formdata.append("menuId", val.menuId);
          MenuDelete(formdata).then((response) => {
            if (response.data.code === 200) {
              context.root.$message({
                type: "success",
                message: `${response.data.msg}`,
              });
            } else {
              context.root.$message({
                type: "warning",
                message: `${response.data.msg}`,
              });
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
    return {
      data,
      MenuEditing, //抛出菜单管理编辑
      ResetUserList,
      newlyAdded,
      SearchRoles,
      DeleteBtn,
      menuList
    };
  },
};
</script>
<style lang="scss" scoped>
.block {
  margin-top: 200px;
}
.btna{
  margin-top:30px;
}
</style>