<template>
  <div>
    <el-form :model="data" :inline="true" class="demo-form-inline" ref="data">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="班级" prop="name">
            <el-select
              v-model="data.gradeName"
              placeholder="请选择"
              @change="ClassSelection"
            >
              <el-option
                v-for="item in data.gradeNames"
                :key="item.gradeId"
                :label="item.gradeName"
                :value="item.gradeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="课程" prop="name">
            <el-select
              v-model="data.courseName"
              placeholder="请选择"
              @change="CourseSelection"
            >
              <el-option
                v-for="item in data.courseNames"
                :key="item.courseId"
                :label="item.courseName"
                :value="item.courseId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="作业" prop="name">
            <el-select v-model="data.jobName" placeholder="请选择">
              <el-option
                v-for="item in data.jobNames"
                :key="item.jobId"
                :label="item.jobName"
                :value="item.jobId"
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
        <!-- <el-button type="danger" size="mini" @click="DeleteRole(data.data)"
          >删除</el-button
        > -->
        <el-button type="success" size="mini" @click="EditingRoles(data.data)"
          >批改</el-button
        >
      </template>
    </Table>

    <Correcting
      :JobManagementEditData="data.JobManagementEditData"
      :CorrectionSwitch.sync="data.CorrectionSwitch"
    ></Correcting>
  </div>
</template>
<script>
//引入vue3.0 的API
import { computed, onBeforeMount, reactive, watch } from "@vue/composition-api";
//引入编辑组件
import Correcting from "@/components/homeworkCorrecting/Correcting/index.vue";
//引入公共表格的组件
import Table from "@/components/table/index.vue";
//引入时间戳
import dateFormat from "@/utils/common.js";
//引入接口api
import {
  PushJobtTList,
  PushJobtGradeId,
  PushJobJList,
  PushJobList,
  PushJobDelete,
} from "@/api/Correcting.js";
export default {
  name: "userManagement",
  components: {
    Table,
    Correcting,
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
      CorrectionSwitch: false,
      //传入要在编辑框显示的数据
      JobManagementEditData: {},
      //传入公共组件表格的整体数据
      configTable: {
        //多选框的显示
        selection: false,
        //表格的头部数据
        tableHeader: [
          { lable: "学生姓名", field: "userName" },
          { lable: "课程名称", field: "courseName" },
          { lable: "作业名称", field: "jobName" },
          { lable: "提交时间", field: "submitTime" },
          { lable: "状态", field: "status" },
          { lable: "作业情况", field: "cases" },
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
      //选择班级
      gradeNames: [
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
      //已选择的班级
      gradeName: "",
      //选择课程
      courseNames: [
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
      courseName: "",
      //选择作业
      jobNames: [
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
      //已选择的作业
      jobName: "",
    });
    //方法区域相当于2.0的methods
    // //用户管理删除角色
    // const DeleteRole = (val) => {
    //   context.root
    //     .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     })
    //    .then(() => {
    //       var formData = new FormData();
    //       formData
    //         .append(
    //           "pushId",
    //           val.pushId
    //         )
    //          PushJobDelete(formData)
    //         .then((response) => {
    //           if (response.data.code === 200) {
    //             context.root.$message({
    //               message: `${response.data.msg}`,
    //               type: "success",
    //             });
    //             encapsulation();
    //           } else {
    //             context.root.$message({
    //               message: `${response.data.msg}`,
    //               type: "warning",
    //             });
    //           }
    //         });
    //     })
    //     .catch(() => {
    //       context.root.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // };
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
        dataSheet();
      }
    );
    //页面挂在前
    onBeforeMount(() => {
      //班级
      bj();
      dataSheet();
    });
    //封装获取班级
    const bj = () => {
      PushJobtTList().then((response) => {
        // console.log(response.data.data);
        data.gradeNames = response.data.data;
      });
    };
    //封装获取数据列表
    const dataSheet = () => {
      let obj = {
        pageSize: data.pageSize,
        pageNum: data.currentPage,
        gradeId: data.gradeName,
        courseId: data.courseName,
        jobId: data.jobName,
      };
      PushJobList(obj).then((response) => {
        console.log(response);
        data.configTable.tableData = response.data.rows;
        Callback(response);
      });
    };
    //封装回调数据改变时间格式
    const Callback = (response) => {
      data.total = response.data.total;
      let arr = response.data.rows;
      for (let i = 0; i < arr.length; i++) {
        arr[i].sex == 0 ? (arr[i].sex = "男") : (arr[i].sex = "女");
        arr[i].cases == 0 ? (arr[i].cases = "按期") : (arr[i].cases = "迟交");
        let date = new Date(arr[i].createTime);
        let date1 = new Date(arr[i].deadline);
        let date2 = new Date(arr[i].submitTime);
        arr[i].createTime = dateFormat.formatDate(date, "yyyy-MM-dd hh:mm");
        arr[i].deadline = dateFormat.formatDate(date1, "yyyy-MM-dd hh:mm");
        arr[i].submitTime = dateFormat.formatDate(date2, "yyyy-MM-dd hh:mm");
        arr[i].status == 0
          ? (arr[i].status = "已提交")
          : (arr[i].status = "未提交");
      }
      data.configTable.tableData = arr;
    };
    //用户管理批改角色
    const EditingRoles = (value) => {
      data.JobManagementEditData = value;
      data.CorrectionSwitch = true;
    };
    //搜索角色方法
    const SearchRoles = () => {
        dataSheet()
    };
    //重置用户列表
    const ResetUserList = () => {
      //重置搜索框表单
      data.gradeName = "";
      data.courseName = "";
      data.jobName = "";
    };
    /*******************班级数据改变************************* */
    const ClassSelection = (val) => {
      //  console.log(val)
      let obj = {
        gradeId: val,
      };
      PushJobtGradeId(obj).then((response) => {
        //  console.log(response)
        data.courseNames = response.data.data;
      });
    };
    //课程改变
    const CourseSelection = (val) => {
      console.log(val);
      let obj = {
        courseId: val,
      };
      PushJobJList(obj).then((response) => {
        // console.log(response);
        data.jobNames = response.data.data;
      });
    };
    /************************************************ */
    return {
      data,
    //   DeleteRole, //抛出用户管理删除角色
      EditingRoles, //抛出用户管理编辑角色
      ResetUserList,
      strip,
      page,
      SearchRoles,
      bj,
      ClassSelection,
      CourseSelection,
      dataSheet,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>