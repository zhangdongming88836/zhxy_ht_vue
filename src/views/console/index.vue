<template>
    <div :class="[meunStatus ? 'close' : 'open']">
        <Header/>
        <Main/>
        <Nav/>
    </div>
</template>
<script>
import Header from "./Header/index.vue" //引入子组件Header文件下的index
import Main from "./main/index.vue"    //引入子组件main文件下的index
import Nav from "./nav/index.vue"      //引入子组件nav文件下的index
import {computed,} from "@vue/composition-api"
export default {
   components:{
        Header,
        Main,
        Nav
   },
   name:"console",
   setup(props,context){
       const meunStatus = computed(()=>{
         return  context.root.$store.state.curriculum.isCollapse
       })
       console.log(meunStatus)
     return{
      meunStatus,
     }
   }
}
</script>
<style lang="scss" scoped>

</style>