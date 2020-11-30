<template>
  <div>
    <div id="nav-wrap">
      <!-- 后台导航上面的图片 -->
      <h1 class="logo">
        <img src="../../../assets/backstageIMG/p3.jpg" alt="" />
      </h1>
      <!-- ui的导航组件 -->
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#fff"
        router
      >
        <template v-for="(item, index) in data.routes">
          <el-submenu  :key="item.id" :index="index + ''">
            <template slot="title">
              <svg-icon :iconClass="item.icon" :className="item.icon"/>
              <span slot="title">{{ item.menuName }}</span>
            </template>
            <template  v-for="itemu in item.children">
            <el-menu-item
              :key="itemu.id"
              :index="itemu.url"
              >{{ itemu.menuName}}</el-menu-item
            >
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  onMounted,
  watch,
  computed,
  onBeforeMount
} from "@vue/composition-api";
import {Menu,} from "@/api/login.js";
export default {
  name: "consoleNav",
  setup(props, context) {
    //data保存所有的变量
    const data = reactive({
      routes: []
    });
    //这里是3.0写方法的区域  相当于2.0的methods
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    //监听并获取vuex里的isCollapse的值;
    const  isCollapse = computed(() => {
       return context.root.$store.state.curriculum.isCollapse;
    })
    //挂在之前请求菜单接口
    onBeforeMount(()=>{
       //获取系统菜单
         Menu().then(response => {
            //获取的路由赋值给data中的routes数组
            // console.log(response.data.data.user.loginName)
            context.root.$store.commit("login/SET_USERNAME",response.data.data.user.loginName)
           data.routes = response.data.data.menus;                            //context.root.$router.options.routes;
         })
    });
    //3.0的语法所有的变量都要抛出去
    return {
      data,
      handleOpen,
      handleClose,
      isCollapse,
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  img {
    width: 92px;
    margin: 28px auto 25px;
    @include webkit(transition, all 0.5s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 1s ease 0s);
}
//后台导航打开时候的样式
.open{
   #nav-wrap{
      width:$navMenu; 
   } 
}
//后台导航关闭的时候的样式
.close{
     #nav-wrap{width:$navMenuMin;}
   .logo img {width:60%;} 
}
</style>