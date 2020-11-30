<template>
  <div>
    <el-dialog
      title="批改"
      :visible.sync="data.CorrectionSwitch"
      center
      :modal-append-to-body="false"
      @close="close"
      @open="open"
    >
    
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
export default {
  name: "UserPopUpWindow",
  props: {
    CorrectionSwitch: {
      type: Boolean,
      default: false,
    },
    JobManagementEditData:{
      type:Object,
      default:()=>{}
    }
  },
  setup(props, context) {

    const data = reactive({
      //弹窗启禁开关的变量
      CorrectionSwitch: false,
    })
/*/////////********************************************** */
    watch(
      () => props.CorrectionSwitch,
      (value) => {
        data.CorrectionSwitch = value;
      }
    );
    //打开对话框
    const open = () => {
       let Edits = props.JobManagementEditData
       
    };
    //关闭对话框
    const close = () => {
      context.emit("update:CorrectionSwitch", data.CorrectionSwitch);
    };
    return {
      data,
      close,
      open,
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
  margin-top: 20px;
}
</style>