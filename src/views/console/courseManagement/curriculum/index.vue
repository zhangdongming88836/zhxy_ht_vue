<template>
  <div>
    <el-form :model="data" :inline="true" class="demo-form-inline" ref="data">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="课程" prop="name">
            <el-input v-model="data.userName" placeholder="课程名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教学老师" prop="name">
            <el-select v-model="data.teacher" placeholder="请选择">
              <el-option
                v-for="item in data.teachers"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
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
        <el-button
          type="success"
          size="mini"
          @click="UploadInformation(data.data)"
          >上传</el-button
        >
        <el-button type="success" size="mini" @click="PublishJob(data.data)"
          >作业</el-button
        >
      </template>
    </Table>
    <CourseAddition
      :CourseAddSwitch.sync="data.CourseAddSwitch"
    ></CourseAddition>
    <CourseEditor
      :CourseEditingData="data.CourseEditingData"
      :CourseEditingswitch.sync="data.CourseEditingswitch"
      @curriculums="curriculums"
    ></CourseEditor>
    <PublishJob :OperationSwitch.sync="data.OperationSwitch"></PublishJob>
  </div>
</template>
<script>
//引入vue3.0 的API
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
//引入编辑组件
import CourseEditor from "@/components/curriculum/CourseEditor/index.vue";
//引入公共表格的组件
import Table from "@/components/table/index.vue";
//引入添加组件
import CourseAddition from "@/components/curriculum/CourseAddition/index.vue";
//引入作业组件
import PublishJob from "@/components/curriculum/PublishJob/index.vue";
//引入api
import { CourseList, CourseToList, CourseDelete } from "@/api/curriculum.js";
//引入时间戳
import dateFormat from "@/utils/common.js";
export default {
  name: "userManagement",
  components: {
    Table,
    CourseEditor,
    CourseAddition,
    PublishJob,
  },
  setup(props, context) {
    const data = reactive({
      //总页数
      total: null,
      //每页的条数
      pageSize: 10,
      //当前页数
      currentPage: 1,
      //作业组件开关变量
      OperationSwitch: false,
      //搜索用户名的变量
      userName: "",
      //添加框启禁开关的变量
      CourseAddSwitch: false,
      //编辑框启禁开关的变量
      CourseEditingswitch: false,
      //传入要在编辑框显示的数据
      CourseEditingData: {},
      //传入公共组件表格的整体数据
      configTable: {
        //多选框的显示
        selection: false,
        //表格的头部数据
        tableHeader: [
          { lable: "课程名称", field: "courseName" },
          { lable: "课程标题", field: "title" },
          { lable: "授课老师", field: "userName" },
          { lable: "课程状态", field: "status" },
          { lable: "课程所属学期", field: "semester" },
          { lable: "创建时间", field: "createTime" },
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
      //教师选择
      teachers: [
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
      //选中的学期
      teacher: "",
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
          formdata.append("courseId", val.courseId);
          CourseDelete(formdata).then((response) => {
            console.log(response);
            if (response.data.code === 200 ) {
              context.root.$message({
                type: "success",
                message: `${response.data.msg}`,
              });
              curriculums();
            }else{
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
    //用户管理编辑角色
    const EditingRoles = (value) => {
      data.CourseEditingData = value;
      data.CourseEditingswitch = true;
    };
    //搜索角色方法
    const SearchRoles = () => {
      curriculums();
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
      data.CourseAddSwitch = true;
    };
    //上传资料的方法
    const UploadInformation = (Information) => {
      console.log(Information);
      context.root.$router.push({ path: "/resources" });
    };
    //布置作业的方法
    const PublishJob = (Job) => {
      data.OperationSwitch = true;
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
        curriculums();
      }
    );
    onBeforeMount(() => {
      curriculums();
      teacher();
    });
    //封装获取数据列表和搜索的的方法
    const curriculums = () => {
      let obj = {
        pageSize: data.pageSize,
        pageNum: data.currentPage,
        courseName: data.userName,
        userId: data.teacher,
      };
      CourseList(obj).then((response) => {
        Callback(response);
      });
    };
    //封装获取教学教师信息的api
    const teacher = () => {
      CourseToList().then((response) => {
        data.teachers = response.data.data;
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
          ? (arr[i].status = "未发布")
          : (arr[i].status = "已发布");
      }
      data.configTable.tableData = arr;
    };
    /*************************************************** */
    return {
      data,
      DeleteRole, //抛出用户管理删除角色
      EditingRoles, //抛出用户管理编辑角色
      ResetUserList,
      newlyAdded,
      UploadInformation,
      PublishJob,
      strip,
      page,
      SearchRoles,
      curriculums
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
 