<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="data.AddSwitch"
      center
      :modal-append-to-body="false"
      @close="close"
      @open="open"
    >
      <div class="enter">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="题目名称：">
                <el-input v-model="data.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="类型：">
                <el-select v-model="data.type" placeholder="请选择">
                  <el-option
                    v-for="item in data.types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程：">
                <el-select v-model="data.CourseID" placeholder="请选择">
                  <el-option
                    v-for="item in data.CourseIDs"
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
              <el-form-item label="A：">
                <el-input v-model="data.select_a"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="B：">
                <el-input v-model="data.select_b"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="C：">
                <el-input v-model="data.select_c"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="D：">
                <el-input v-model="data.select_d"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="E：">
                <el-input v-model="data.select_e"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="F：">
                <el-input v-model="data.select_f"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="G：">
                <el-input v-model="data.select_g"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="H：">
                <el-input v-model="data.select_h"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="答案：">
                <el-input v-model="data.result"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="解析：">
                <el-input v-model="data.analysis" type="textarea"></el-input>
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
import { TopicToList, TopicInsert } from "@/api/QuestionBank.js";
export default {
  name: "UserPopUpWindow",
  props: {
    AddSwitch: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const data = reactive({
      //弹窗启禁开关的变量
      AddSwitch: false,
      //解析
      analysis:"",
      //题目
      title: "",
      //字母
      select_a: "",
      select_b: "",
      select_c: "",
      select_d: "",
      select_e: "",
      select_f: "",
      select_g: "",
      select_h: "",
      //答案
      result: "",
      types: [
        {
          value: "0",
          label: "单选题",
        },
        {
          value: "1",
          label: "多选题",
        },
      ],
      type: "",
      CourseIDs: [
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
      CourseID: "",
    });
    //发送
    const dialogFormVisible = () => {
      let obj = {
        title: data.title,
        result: data.result,
        courseId: data.CourseID,
        type: data.type,
        selectA: data.select_a,
        selectB: data.select_b,
        selectC: data.select_c,
        selectD: data.select_d,
        selectE: data.select_e,
        selectF: data.select_f,
        selectG: data.select_g,
        selectH: data.select_h,
        analysis:data.analysis,
      };
      TopicInsert(obj).then((response) => {
        if (response.data.code === 200) {
          context.root.$message({
            message: `${response.data.msg}`,
            type: "success",
          });
          data.AddSwitch = false;
          context.emit("QuestionBank");
        } else {
          context.root.$message({
            message: `${response.data.msg}`,
            type: "warning",
          });
        }
      });
    };
    watch(
      () => props.AddSwitch,
      (value) => {
        data.AddSwitch = value;
      }
    );
    const close = () => {
      context.emit("update:AddSwitch", data.AddSwitch);
    };
    const open = () => {
      TopicToList().then((response) => {
        data.CourseIDs = response.data.data;
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
</style>