<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="data.MenuAddswitch"
      center
      :modal-append-to-body="false"
      @close="close"
      @open="open"
      width="60%"
    >
      <div class="enter">
        <el-tree
          :data="data.trees"
          :props="data.defaultProps"
          node-key="id"
          highlight-current
          current-node-key
          ref="tree"
          accordion
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="choice"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
import {TreeData} from "@/api/role.js"
export default {
  name: "UserPopUpWindow",
  props: {
    MenuAddswitch: {
      type: Boolean,
      default: false,
    },
    parentId1:{
      type:String,
      default:""
    }
  },
  setup(props, context) {
    const data = reactive({
      //弹窗启禁开关的变量
      MenuAddswitch: false,
      value11:"",
      //选中的数据
      SelectTheTree : {},
       //树结构总数据
         trees: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }

    });
    watch(
      () => props.MenuAddswitch,
      (value) => {
        data.MenuAddswitch = value;
      }
    );
    
    watch( ()=> props.parentId1 , (val)=>{
      data.value11 = val;
    })
    const close = () => {
      context.emit("update:MenuAddswitch", data.MenuAddswitch);
    };
    //打开对话框
    const open = () => {
      TreeData().then(response => {
        data.trees = response.data.data;
      })
     context.refs.tree.setCurrentKey(data.value11)
      console.log(data.value11)
    }
    //树结构菜单的方法
    const handleNodeClick = (value) => {
         data.SelectTheTree = value;
        }
     //确定方法
    const choice = () => {
      context.emit("AcceptTree" , data.SelectTheTree);
      data.MenuAddswitch = false;
    }   
    return {
      data,
      close,
      handleNodeClick,
      choice,
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
</style>