<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="data.JobManagementEditSwitch"
      center
      :modal-append-to-body="false"
      @close="close"
      @open="open"
    >
      <div class="enter">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="作业名称：">
                <el-input v-model="data.jobName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程名称：">
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
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="作业格式：">
                <el-input v-model="data.format"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="截止日期：">
                <el-date-picker
                  v-model="data.deadline"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="作业内容：">
                <el-input type="textarea" v-model="data.problem"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
//引入接口api
import { JobEdit, JobUpdate, } from "@/api/task.js";
export default {
  name: "UserPopUpWindow",
  props: {
    JobManagementEditSwitch: {
      type: Boolean,
      default: false,
    },
    JobManagementEditData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const data = reactive({
      //弹窗启禁开关的变量
      JobManagementEditSwitch: false,
      //作业名称
      jobName: "",
      //结束时间
      deadline: "",
      //格式
      format: "",
      //内容
      problem: "",
      //id
      jobId:"",
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
    watch(
      () => props.JobManagementEditSwitch,
      (value) => {
        data.JobManagementEditSwitch = value;
      }
    );
    //确定发送
    const dialogFormVisible = () => {
      let obj = {
        jobName: data.jobName,
        deadline: data.deadline,
        format: data.format,
        problem: data.problem,
        courseId: data.course,
        jobId: data.jobId
      };
      JobUpdate(obj).then((response) => {
          if(response.data.code === 200){
          context.root.$message({
          message: `${response.data.msg}`,
          type: 'success'
        });
        data.JobManagementEditSwitch = false;
        context.emit("encapsulation");
        }else{
            context.root.$message({
          message: `${response.data.msg}`,
          type: 'warning'
        });
        }
      });
    };
    //打开对话框
    const open = () => {
      let Edits = props.JobManagementEditData;
      data.jobId =Edits.jobId
      let obj = {
        jobId: Edits.jobId,
      };
      JobEdit(obj).then((response) => {
        // console.log(response.data.data);
        let resData = response.data.data;
        data.courses = resData.courseList;
        data.jobName = resData.job.jobName;
        data.deadline = resData.job.deadline;
        data.format = resData.job.format;
        data.problem = resData.job.problem;
        data.course = resData.job.courseId;
      });
    };
    //关闭对话框
    const close = () => {
      context.emit(
        "update:JobManagementEditSwitch",
        data.JobManagementEditSwitch
      );
    };
    return {
      data,
      close,
      open,
      dialogFormVisible,
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