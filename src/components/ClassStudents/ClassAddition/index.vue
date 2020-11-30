<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="data.ClassAddswitch"
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
import { GradeToInsert, GradeInsert } from "@/api/student.js";
export default {
  name: "UserPopUpWindow",
  props: {
    ClassAddswitch: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const data = reactive({
      //弹窗启禁开关的变量
      ClassAddswitch: false,
      //供选择的数组
      cityOptions: [],
      //已选择的数组
      checkedCities: [],
      //班级编码
      code:"",
      //班级名称
      gradeName:""
    });
    watch(
      () => props.ClassAddswitch,
      (value) => {
        data.ClassAddswitch = value;
      }
    );
    const close = () => {
      context.emit("update:ClassAddswitch", data.ClassAddswitch);
    };
    //打开对话框
    const open = () => {
      GradeToInsert().then((response) => {
        console.log(response.data.data);
        data.cityOptions = response.data.data;
      });
    };
    //确定发送添加数据
    const dialogFormVisible = () => {
      let obj = {
        gradeName: data.gradeName,
        code: data.code,
        courseIds: data.checkedCities,
      };
      GradeInsert(obj).then((response) => {
        if (response.data.code === 200) {
          context.root.$message({
            message: `${response.data.msg}`,
            type: "success",
          });
          data.ClassAddswitch = false;
          context.emit("student");
        } else {
          context.root.$message({
            message: `${response.data.msg}`,
            type: "warning",
          });
        }
      });
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
.uisd {
  padding-left: 5px;
}
</style>