<template>
    <div id="main-wrap">
      <div class="content"><router-view/></div>
    </div>
</template>
<script>
export default {
    name:"consoleMain"
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
 height:100vh;
 position:fixed;
 left:$navMenu;
 top:75px;   
 right:0;
 bottom:0;
 border:30px solid #f7f7f7;
 border-bottom:none;
 overflow-y:auto;
 @include webkit (box-sizing,border-box);
 @include webkit (transition,all 1s ease 0s);
}
.content{
    padding-left:30px;
    padding-top:30px;
    padding-right:30px;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
}
//后台导航打开时候的样式
.open{
  #main-wrap{
      left:$navMenu; 
   } 
}
//后台导航关闭的时候的样式
.close{
    #main-wrap{
      left:$navMenuMin; 
   } 
}
</style>