<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="data.MenuEditSwitch"
      center
      :modal-append-to-body="false"
      @close="close"
      @open="open"
    >
      <div class="block">
        <el-form
          :model="data"
          :inline="true"
          class="demo-form-inline"
          ref="data"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="菜单名称" prop="name">
                <el-input class="inputWidth" v-model="data.menuName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="请求地址" prop="name">
                <el-input class="inputWidth" v-model="data.url"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="blocks"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="菜单类型" prop="name">
                <el-select v-model="data.menuType" placeholder="请选择">
                  <el-option
                    v-for="item in data.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单状态" prop="name">
                <el-select v-model="data.visible" placeholder="请选择">
                  <el-option
                    v-for="item in data.optionS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="blocks"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="上级菜单" prop="name">
                <el-input
                  v-model="data.parentId.label"
                  class="inputWidth"
                  @focus="focus"
                  :placeholder="data.parentName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序" prop="name">
                <el-input class="inputWidth" v-model="data.orderNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="blocks"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="权限标识" prop="name">
                <el-input v-model="data.perms"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单图标" prop="name">
                <el-input class="inputWidth" v-model="data.icon"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="blocks"></div>
        <div class="conter">
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <MenuAdd
      :MenuAddswitch.sync="data.MenuAddswitch"
      @AcceptTree="AcceptTree"
      :parentId1="data.parentId1"
    ></MenuAdd>
  </div>
</template>
<script>
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
import { MenuInsert, MenuEditMenuId, MenuUpdate } from "@/api/MenuManagement";
import MenuAdd from "@/components/MenuRules/MenuAdd/index.vue";
export default {
  components: {
    MenuAdd,
  },
  name: "UserPopUpWindow",
  props: {
    MenuEditSwitch: {
      type: Boolean,
      default: false,
    },
    MenuEditData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const data = reactive({
      MenuAddswitch: false,
      //弹窗启禁开关的变量
      MenuEditSwitch: false,
      parentId: {},
      menuName: "",
      orderNum: "",
      url: "#",
      perms: "",
      icon: "",
      parentId1: "",
      parentName: "",
      menuId:"",
      parentIds:"",  
      /**************菜单类型****************** */
      options: [
        {
          value: "M",
          label: "目录",
        },
        {
          value: "C",
          label: "菜单",
        },
        {
          value: "F",
          label: "按钮",
        },
      ],
      menuType: "",
      /**************菜单状态****************** */
      optionS: [
        {
          value: "0",
          label: "显示",
        },
        {
          value: "1",
          label: "隐藏",
        },
      ],
      visible: "",
    });
    //获取焦点触发对话框
    const focus = () => {
      data.MenuAddswitch = true;
    };
    //接受子组件的树数据
    const AcceptTree = (value) => {
      data.parentId = value;
    };
    /***************************************************************** */
    watch(
      () => props.MenuEditSwitch,
      (value) => {
        data.MenuEditSwitch = value;
      }
    );
    //打开对话框
    const open = () => {
      let Edits = props.MenuEditData;
      MenuEditMenuId(Edits).then((response) => {
        let objData = response.data.data;
        data.menuName = objData.menuName;
        data.orderNum = objData.orderNum;
        data.url = objData.url;
        data.perms = objData.perms;
        data.icon = objData.icon;
        data.menuType = objData.menuType;
        data.visible = objData.visible;
        data.menuId = objData.menuId ;
        data.parentName = objData.parentName;
        data.parentIds = objData.parentId;
        console.log(data.parentIds);
      });
    };
    watch(()=> data.parentId , (val)=>{
      console.log(val)
    })
    //关闭对话框
    const close = () => {
      context.emit("update:MenuEditSwitch", data.MenuEditSwitch);
    };
    //确认发送编辑数据
    const confirm = () => {
      let obj = {
        menuName: data.menuName,
        orderNum: data.orderNum,
        url: data.url,
        perms: data.perms,
        icon: data.icon,
        menuType: data.menuType,
        visible: data.visible,
        parentId: JSON.stringify(data.parentId) == "{}"   ?  data.parentIds :  data.parentId.id,
        menuId:data.menuId ,
      };
      MenuUpdate(obj).then((response) => {
        console.log(response)
        if(response.data.code === 200){
          context.root.$message({
          message: `${response.data.msg}`,
          type: 'success'
        });
        data.MenuEditSwitch = false
        context.emit("menuList")
        }else{
           context.root.$message({
          message: `${response.data.msg}`,
          type: 'warning'
        });
        }
      });
    };
    onBeforeMount(() => {
      
    })
    return {
      data,
      close,
      open,
      focus,
      AcceptTree,
      confirm,
    };
  },
};
</script>
<style lang="scss" scoped>
.block {
  width: 60%;
  margin: 30px auto;
}
.blocks {
  height: 30px;
}
.conter {
  width: 100px;
  margin: 0 auto;
}
</style>