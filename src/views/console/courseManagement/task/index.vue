<template>
  <div>
    <el-form :model="data" :inline="true" class="demo-form-inline" ref="data">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="作业名称" prop="name">
            <el-input v-model="data.userName" placeholder="作业名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="所属课程" prop="name">
            <el-select v-model="data.course" placeholder="请选择">
              <el-option
                v-for="item in data.courses"
                :key="item.courseId"
                :label="item.courseName"
                :value="item.courseId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="SearchRoles()">搜索</el-button>
            <el-button type="primary" @click="ResetUserList()">重置</el-button>
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
        <template v-if="data.data.status == '未发布'">
          <el-button type="success" size="mini" @click="PublishJob(data.data)"
            >发布</el-button
          >
        </template>
      </template>
    </Table>

    <JobManagementEditor
      :JobManagementEditData="data.JobManagementEditData"
      :JobManagementEditSwitch.sync="data.JobManagementEditSwitch"
      @encapsulation="encapsulation"
    ></JobManagementEditor>
  </div>
</template>
<script>
//引入vue3.0 的API
import { computed, onBeforeMount, reactive, watch } from "@vue/composition-api";
//引入编辑组件
import JobManagementEditor from "@/components/jobManagement/JobManagementEditor/index.vue";
//引入公共表格的组件
import Table from "@/components/table/index.vue";
//引入时间戳
import dateFormat from "@/utils/common.js";
//引入接口api
import { JobToList, Joblist, JobDelete } from "@/api/task.js";
export default {
  name: "userManagement",
  components: {
    Table,
    JobManagementEditor,
  },
  setup(props, context) {
    const data = reactive({
      //总页数
      total: null,
      //每页的条数
      pageSize: 10,
      //当前页数
      currentPage: 1,
      /************************* */
      //搜索用户名的变量
      userName: "",
      //编辑框启禁开关的变量
      JobManagementEditSwitch: false,
      //传入要在编辑框显示的数据
      JobManagementEditData: {},
      //传入公共组件表格的整体数据
      configTable: {
        //多选框的显示
        selection: false,
        //表格的头部数据
        tableHeader: [
          { lable: "作业名称", field: "jobName" },
          { lable: "作业内容", field: "problem" },
          { lable: "课程名称", field: "courseName" },
          { lable: "发布时间", field: "createTime" },
          { lable: "截止时间", field: "deadline" },
          { lable: "状态", field: "status" },
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
      //选择所属课程
      courses: [
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
      //已选择的课程
      course: "",
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
          var formData = new FormData()
          formData.append("jobId",val.jobId )
          JobDelete(formData).then((response) => {
            if (response.data.code === 200) {
              context.root.$message({
                message: `${response.data.msg}`,
                type: "success",
              });
              encapsulation()
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
        student();
      }
    );
    //页面挂在前
    onBeforeMount(() => {
      encapsulation();
      JobToList().then((response) => {
        data.courses = response.data.data;
      });
    });
    //封装获取到的数据
    const encapsulation = () => {
      let obj = {
        pageSize: data.pageSize,
        pageNum: data.currentPage,
        jobName: data.userName,
        courseId: data.course,
      };
      Joblist(obj).then((response) => {
        Callback(response);
        data.configTable.tableData = response.data.rows;
      });
    };
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
      }
      data.configTable.tableData = arr;
    };
    //用户管理编辑角色
    const EditingRoles = (value) => {
      data.JobManagementEditData = value;
      data.JobManagementEditSwitch = true;
    };
    //搜索角色方法
    const SearchRoles = () => {
      encapsulation();
    };
    //重置用户列表
    const ResetUserList = () => {
      //重置搜索框表单
      data.userName = "";
      data.course = "";
      encapsulation()
    };
    //发布作业的方法
    const PublishJob = (shJob) => {
      console.log(shJob);
    };
    return {
      data,
      DeleteRole, //抛出用户管理删除角色
      EditingRoles, //抛出用户管理编辑角色
      ResetUserList,
      PublishJob,
      strip,
      page,
      encapsulation,
      SearchRoles,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>