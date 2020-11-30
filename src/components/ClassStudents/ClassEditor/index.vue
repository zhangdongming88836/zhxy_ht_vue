<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="data.ClassEditingSwitch"
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
                <el-input v-model="data.gradeName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级编码：">
                <el-input v-model="data.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="选择课程：">
                <el-checkbox-group v-model="data.checkedCities">
                  <el-checkbox
                    v-for="city in data.cityOptions"
                    :label="city.courseId"
                    :key="city.courseId"
                    class="uisd"
                    >{{ city.courseName }}</el-checkbox
                  >
                </el-checkbox-group>
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
import { GradeEdit,GradeUpdate } from "@/api/student.js";
export default {
  name: "UserPopUpWindow",
  props: {
    ClassEditingSwitch: {
      type: Boolean,
      default: false,
    },
    ClassEditingData:{
      type:Object,
      default:()=>{}
    }
  },
  setup(props, context) {
    const data = reactive({
      //弹窗启禁开关的变量
      ClassEditingSwitch: false,
        //供选择的数组
      cityOptions: [],
      //已选择的数组
      checkedCities: [],
      //班级编码
      code:"",
      //班级名称
      gradeName:"",
      //本条数据的id
      gradeId:"",
    });
  //发送编辑好的数据
 const dialogFormVisible = () => {
   let obj = {
     gradeId:data.gradeId,
     code:data.code,
     gradeName:data.gradeName,
     courseIds:data.checkedCities
   }
    GradeUpdate(obj).then(response => {
        if (response.data.code === 200) {
          context.root.$message({
            message: `${response.data.msg}`,
            type: "success",
          });
          data.ClassEditingSwitch = false;
          context.emit("student");
        } else {
          context.root.$message({
            message: `${response.data.msg}`,
            type: "warning",
          });
        }
   })
 }
    /*///////////////////******************************************** */
    watch(
      () => props.ClassEditingSwitch,
      (value) => {
        data.ClassEditingSwitch = value;
      }
    );
    //打开对话框
    const open = () => {
       let Edits = props.ClassEditingData
       data.gradeId = Edits.gradeId
       let obj = {
         gradeId:data.gradeId
       }
       GradeEdit(obj).then( responser => {
           let resData = responser.data.data
          data.gradeName = resData.grade.gradeName;
          data.code = resData.grade.code;
          data.checkedCities = resData.courseIds;
          data.cityOptions = resData.courseList;
       })
    };
    //关闭对话框
    const close = () => {
      context.emit("update:ClassEditingSwitch", data.ClassEditingSwitch);
    };
    return {
      data,
      close,
      open,
      dialogFormVisible
    };
  },
};
</script>
<style lang="scss" scoped>
.enter {
  width: 400px;
  margin: 0 auto;
}
.uisd{
  padding-left:5px;
}
</style>