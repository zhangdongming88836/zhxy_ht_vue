<template>
   <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg> 
</template>
<script>
import {ref,reactive,isRef,toRefs,onMounted,computed,watch} from "@vue/composition-api";
export default {
    name:"svgicon",
    props:["iconClass","className"],
    setup(props,context){
        
       const msg = ref(151515615615156156);
       /*
       *computed 监听属性变化，并计算属性
       *计算金额总额
       */
       const iconName = computed(()=>`#icon-${props.iconClass}`)
       
       const svgClass = computed(()=>{
           if(props.className){
               return `svg-icon ${props.className}`
           }else{
               return `svg-icon` 
           }
       })
       return{
           msg,
           iconName,
           svgClass,   
       }
    },
}
</script>
<style lang="scss" scoped>
.svg-icon{
    width:1em;
    height:1em;
    padding-right:10px;
    margin-top:-2px;
    fill:currentcolor;
}
</style>