<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="data.CourseEditingswitch"
      center
      :modal-append-to-body="false"
      @close="close"
      @open="open"
    >
      <div class="enter">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="班级名称：">
                <el-input v-model="data.courseName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程标题：">
                <el-input v-model="data.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="学期：">
                <el-input v-model="data.semester"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="授课老师">
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
          </el-row>
          <div class="block"></div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="课程状态">
                <el-select v-model="data.status" placeholder="请选择">
                  <el-option
                    v-for="item in data.statuss"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="班级：">
                <el-checkbox-group v-model="data.checkedCities">
                  <el-checkbox
                    v-for="(city, index) in data.cityOptions"
                    :label="city.gradeId"
                    :key="index"
                    class="pull-uu"
                    >{{ city.gradeName }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendOut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
//引入api
import { CourseEdit, CourseUpdate } from "@/api/curriculum.js";
export default {
  props: {
    CourseEditingswitch: {
      type: Boolean,
      default: false,
    },
    CourseEditingData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const data = reactive({
      //弹窗启禁开关的变量
      CourseEditingswitch: false,
      //复选框
      cityOptions: [],
      checkedCities: [],
      //班级名称
      courseName: "",
      //课程标题
      title: "",
      //学期
      semester: "",
      //这调数据的id
      courseId:"",
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
      ],
      //选中的老师
      teacher: "",
        //课程状态组
      statuss: [
        {
          userId: "0",
          userName: "已发布",
        },
        {
          userId: "1",
          userName: "未发布",
        },
      ],
      //选中的课程状态
      status: "",
    });

    //发送编辑数据
    const sendOut = () => {
      let obj = {
        courseName: data.courseName,
        title: data.title,
        semester: data.semester,
        userId:data.teacher,
        gradeIds:data.checkedCities,
        status:data.status,
        courseId:data.courseId,
      };
      CourseUpdate(obj).then((response) => {
        console.log(response);
        if(response.data.code === 200){
          context.root.$message({
          message: `${response.data.msg}`,
          type: 'success'
        });
        data.CourseEditingswitch = false;
        context.emit("curriculums");
        }else{
            context.root.$message({
          message: `${response.data.msg}`,
          type: 'warning'
        });
        }
      });
    };

    /***************************************** */
    watch(
      () => props.CourseEditingswitch,
      (value) => {
        data.CourseEditingswitch = value;
      }
    );
    //打开对话框
    const open = () => {
      let edai = props.CourseEditingData.courseId;
      data.courseId = edai;
      let obj = {
        courseId: edai,
      };
      CourseEdit(obj).then((response) => {
        let resData = response.data.data;
        console.log(resData)
        data.teachers = resData.userList;
        data.cityOptions = resData.gradeListAll;
        data.teacher = resData.course.userId;
        data.checkedCities = resData.gradeIds;
        data.courseName = resData.course.courseName;
        data.title = resData.course.title;
        data.semester = resData.course.semester;
        data.status = resData.course.status;
      });
    };
    //关闭对话框
    const close = () => {
      context.emit("update:CourseEditingswitch", data.CourseEditingswitch);
    };
    return {
      data,
      close,
      open,
      sendOut,
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
  margin-top: 10px;
}
.pull-uu {
  padding-left: 5px;
}
</style>