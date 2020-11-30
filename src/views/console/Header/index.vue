<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="info" className="info" />
    </div>
    <div class="pull-right ">
      <div class="user-info pull-left">
      {{userName}}
      </div>
      <div class="header-icon pull-left"  @click="logout">
        <svg-icon iconClass="close" className="close" />
      </div>
    </div>
  </div>
</template>
<script>
import { onBeforeMount,reactive ,computed} from "@vue/composition-api"
import {Logout} from "@/api/login.js"
import {removeToken} from "@/utils/cookie.js"
export default {
  name: "consoleHreader",
  setup(props,context){
    
    const navMenuState = () => {
      context.root.$store.commit("curriculum/SET_ISCOLLAPSE");
    }
    //用户退出
    const logout = () =>{
      console.log(11111111);
       Logout().then(response => {
           console.log(response);
           if(response.data.msg){
           context.root.$router.push({name:"login"});
          //删除cookie中的token
           removeToken();
           }
       })
    };
 
   const userName = computed (() => context.root.$store.state.login.username);
    return{
   userName,  
  navMenuState,
  logout,
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  line-height: 75px;
  @include webkit(transition, all 1s ease 0s);
  @include webkit(box-shadow, 0 3px 16px 0 raba(0, 0, 0, 0.1));
}
.header-icon{
  padding:0 32px;
  svg{
    margin-bottom:-5px;
    font-size:25px;
    cursor:pointer;
  }
}
.user-info{
  height:100%;
  padding:0 32px;
  border-right:1px solid #ededed;
  +.header-icon{
    padding:0 28px;
  }
}
//后台导航打开时候的样式
.open{
   #header-wrap {
      left:$navMenu; 
   } 
}
//后台导航关闭的时候的样式
.close{
     #header-wrap {
      left:$navMenuMin; 
   } 
}
</style>