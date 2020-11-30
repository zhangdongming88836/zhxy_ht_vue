<template>
  <div>
    <el-form :model="data" :inline="true" class="demo-form-inline" ref="data">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="题目名称" prop="name">
            <el-input
              v-model="data.userName"
              placeholder="题目名称 "
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="课程" prop="name">
            <el-select v-model="data.value" placeholder="请选择">
              <el-option
                v-for="item in data.options"
                :key="item.courseId"
                :label="item.courseName"
                :value="item.courseId"
              >
              </el-option>
            </el-select>
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
        <el-button type="danger" size="mini" @click="DeleteRole(data.data)"
          >删除</el-button
        >
        <el-button type="success" size="mini" @click="EditingRoles(data.data)"
          >编辑</el-button
        >
      </template>
    </Table>
    <QuestionBankAddSwitch
      :AddSwitch.sync="data.AddSwitch"
      @QuestionBank="QuestionBank"
    ></QuestionBankAddSwitch>
    <QuestionBankEditor
      :ItemBankEditingData="data.ItemBankEditingData"
      :EditSwitch.sync="data.EditSwitch"
      @QuestionBank="QuestionBank"
    ></QuestionBankEditor>
  </div>
</template>
<script>
//引入vue3.0 的API
import { reactive, watch, onBeforeMount } from "@vue/composition-api";
//引入编辑组件
import QuestionBankEditor from "@/components/QuestionBankManagement/QuestionBankEditor/index.vue";
//引入公共表格的组件
import Table from "@/components/table/index.vue";
//引入添加组件
import QuestionBankAddSwitch from "@/components/QuestionBankManagement/QuestionBankAddSwitch/index.vue";
//引入时间戳
import dateFormat from "@/utils/common.js";
//引入接口api
import { TopicToList, TopicList, TopicDelete } from "@/api/QuestionBank.js";
export default {
  name: "userManagement",
  components: {
    Table,
    QuestionBankAddSwitch,
    QuestionBankEditor,
  },
  setup(props, context) {
    const data = reactive({
      //总页数
      total: null,
      //每页的条数
      pageSize: 10,
      //当前页数
      currentPage: 1,
      /************************** */
      //搜索用户名的变量
      userName: "",
      //添加框启禁开关的变量
      AddSwitch: false,
      //编辑框启禁开关的变量
      EditSwitch: false,
      //传入要在编辑框显示的数据
      ItemBankEditingData: {},
      //传入公共组件表格的整体数据
      configTable: {
        //多选框的显示
        selection: false,
        //表格的头部数据
        tableHeader: [
          { lable: "题目名称", field: "title" },
          { lable: "课程名称", field: "courseName" },
          { lable: "题目类型", field: "type" },
          { lable: "创建者", field: "createName" },
          { lable: "操作", typeRow: "slot", slotName: "status" },
        ],
        //表格内容的数据
        tableData: [
          {
            date: 0 == 0 ? "男" : "女",
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
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
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
          var formData = new FormData();
          formData.append("topicId", val.topicId);
          TopicDelete(formData).then((response) => {
            if (response.data.code === 200) {
              context.root.$message({
                message: `${response.data.msg}`,
                type: "success",
              });
              QuestionBank();
            } else {
              context.root.$message({
                message: `${response.data.msg}`,
                type: "warning",
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
    //用户管理编辑角色
    const EditingRoles = (value) => {
      data.ItemBankEditingData = value;
      data.EditSwitch = true;
    };
    //搜索角色方法
    const SearchRoles = () => {
      QuestionBank();
    };
    //重置用户列表
    const ResetUserList = () => {
      //重置搜索框表单
      data.userName = "";
      data.value = "";
      QuestionBank();
    };
    //添加框按钮的启禁方法
    const newlyAdded = () => {
      data.AddSwitch = true;
    };
    /**************************** */
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
        QuestionBank();
      }
    );
    //页面挂在前
    onBeforeMount(() => {
      QuestionBank();
      TopicToList().then((response) => {
        data.options = response.data.data;
      });
    });
    //封装回调数据改变时间格式
    const Callback = (response) => {
      data.total = response.data.total;
      let arr = response.data.rows;
      for (let i = 0; i < arr.length; i++) {
        arr[i].sex == 0 ? (arr[i].sex = "男") : (arr[i].sex = "女");
        let date = new Date(arr[i].createTime);
        let date1 = new Date(arr[i].deadline);
        arr[i].createTime = dateFormat.formatDate(date, "yyyy-MM-dd hh:mm");
        arr[i].deadline = dateFormat.formatDate(date1, "yyyy-MM-dd hh:mm");
        arr[i].status == 0
          ? (arr[i].status = "已发布")
          : (arr[i].status = "未发布");
        arr[i].type == 0 ? (arr[i].type = "单选题") : (arr[i].type = "多选题");
      }
      data.configTable.tableData = arr;
    };
    //封装列表和搜索数据
    const QuestionBank = () => {
      let obj = {
        title: data.userName,
        courseId: data.value,
        pageSize: data.pageSize,
        pageNum: data.currentPage,
      };
      TopicList(obj).then((response) => {
        Callback(response);
        data.configTable.tableData = response.data.rows;
      });
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
      QuestionBank,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>