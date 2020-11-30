<template>
  <div>
    <div class="block">
      <el-form :model="data" :inline="true" class="demo-form-inline" ref="data" label-width="80px">
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
              <el-select v-model="data.menuType" placeholder="请选择" class="selet">
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
              <el-select v-model="data.visible" placeholder="请选择" class="selet">
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
              <el-input v-model="data.perms" class="inputWidth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单图标"  prop="name">
              <el-input class="inputWidth" v-model="data.icon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="blocks"></div>
      <div>
        <el-button type="primary" @click="fsg">确定</el-button>
        <el-button type="primary" @click="fhi">返回</el-button>
      </div>
    </div>
    <MenuAdd
      :MenuAddswitch.sync="data.MenuAddswitch"
      @AcceptTree="AcceptTree"
    ></MenuAdd>
  </div>
</template>
<script>
import { reactive,watch } from "@vue/composition-api";
import MenuAdd from "@/components/MenuRules/MenuAdd/index.vue";
import {MenuInsert} from "@/api/MenuManagement"
export default {
  components: {
    MenuAdd,
  },
  name: "addMenu",
  setup(props, context) {
    const data = reactive({
      MenuAddswitch: false,
      parentId: {},
      menuName:"",
      orderNum:"",
      url:"#",
      perms:"",
      icon:"",
      /**************菜单类型****************** */
       options: [{
          value: 'M',
          label: '目录'
        }, {
          value: 'C',
          label: '菜单'
        }, {
          value: 'F',
          label: '按钮'
        },],
        menuType: 'M',
        /**************菜单状态****************** */
        optionS: [{
          value: '0',
          label: '显示'
        }, {
          value: '1',
          label: '隐藏'
        },],
        visible: '0'
    });
    //获取焦点触发对话框
    const focus = () => {
      data.MenuAddswitch = true;
    };
    //接受子组件的树数据
    const AcceptTree = (value) => {
      console.log(value)
      data.parentId = value;
    };
    watch(()=> data.menuType, (val)=>{
      console.log(val)
    })
    //发送
    const fsg = () =>{
      if(data.menuName == "" || data.parentId == "" || data.orderNum == ""){
         context.root.$message({
          message: "不能为空",
          type: 'warning'
        });
        return false
      }
     
        let obj = {
        menuName:data.menuName,
        parentId:data.parentId.id,
        orderNum:data.orderNum,
        url:data.url,
        menuType:data.menuType,
        visible:data.visible,
        perms:data.perms,
        icon:data.icon
      }
      MenuInsert(obj).then(response =>{
         if(response.data.code === 200){
            context.root.$message({
          message: `${response.data.msg}`,
          type: 'success'
        });
        context.root.$router.push({path:"/menuRules"});
      }else{
           context.root.$message({
          message: `${response.data.msg}`,
          type: 'warning'
        });
      }
      })
    }
    //返回
    const fhi = () => {
     context.root.$router.push({path:"/menuRules"});
    }
    return {
      data,
      focus,
      AcceptTree,
      fsg,
      fhi
    };
  },
};
</script>
<style lang="scss" scoped>
.block {
  width:50%;
  margin: 30px auto;
  .inputWidth {
    width: 100%;
  }
  .selet{
    width: 95%;
  }
  .blocks {
    height: 30px;
  }
}
</style>