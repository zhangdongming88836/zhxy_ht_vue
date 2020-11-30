<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="data.OperationSwitch"
      width="70%"
      :modal-append-to-body="false"
      center
      @close="close"
    >
      <el-form :model="data" :inline="true" class="demo-form-inline" ref="data" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="作业标题" prop="name">
              <el-input
                v-model="data.userName"
                placeholder="作业标题"
                class="inwidth"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业内容" prop="name">
              <el-input
                v-model="data.userName"
                placeholder="作业内容"
                class="inwidth"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clock"></div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="指定班级" prop="name" >
              <el-select v-model="data.grade" placeholder="请选择" clearable>
                <el-option
                  v-for="item in data.grades"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止日期" prop="name">
              <el-date-picker
                v-model="data.value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clock"></div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="满分值" prop="name">
              <el-input
                v-model="data.userName"
                placeholder="满分值"
                class="inwidth"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业格式" prop="name">
              <el-select v-model="data.format" placeholder="请选择" clearable  >
                <el-option
                  v-for="item in data.formats"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clock"></div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属课程" prop="name">
              <el-input
                v-model="data.userName"
                placeholder="所属课程"
                class="inwidth"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="知识点" prop="name">
              <el-input
                v-model="data.userName"
                placeholder="所属知识点"
                class="inwidth"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clock"></div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="name">
              <el-input
                type="textarea"
                :rows="3"
                v-model="data.userName"
                placeholder="备注"
                class="inputWidth"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
export default {
  name: "PublishJob",
  props:{
     OperationSwitch:{
         type:Boolean,
         default:false
     }
  },
  setup(props, context) {
     console.log(props)
    const data = reactive({
      OperationSwitch: false,
      value1: "",
      //班级数组
      grades: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        //选中的班级
        grade: '',
        //文件夹格式数组
         formats: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        //选中的文件格式
        format: ''
    });
    //监听开关变量
    watch(()=>props.OperationSwitch,(value)=>{ data.OperationSwitch = value});
    //关闭的时候做些什么
   const  close = () => {
       context.emit("update:OperationSwitch",data.OperationSwitch);
   }
    return {
      data,
      close,
    };
  },
};
</script>
<style lang="scss" scoped>
.inwidth {
  width: 210%;
}
.inputWidth{
    width:300%;
}
.clock {
  height: 30px;
}
</style>