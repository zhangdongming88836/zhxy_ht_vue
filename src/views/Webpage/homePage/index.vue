<template>
  <div>
    <div class="HeadUp-wrap">
      <div class="OutsideThePicture"></div>
      <div class="HeadUp-wrap-operation">
        <div class="pull-left">
          <div class="logo-img">
            <img src="../../../assets/login_img/code.gif" alt="" />
          </div>
        </div>
        <div class="pull-right">
          <div class="pull-left layout" style="color: aqua">首页</div>
          <div class="pull-right layout">登录</div>
        </div>
      </div>
    </div>
    <div class="middle-wrap">
      <div class="middle-wrap-title">
        <h1>深圳信息职业技术学院</h1>
        <span
          >深圳信息职业技术学院创办于2002年4月，是经广东省人民政府批准、教育部备案，由深圳市人民政府举办的公办全日制高等院校。</span
        >
        <span
          >学校现为中国特色高水平高职学校和专业建设计划（简称“双高计划”）第一轮建设单位（B档），国家示范（骨干）高职院校、国家示范性软件职业技术学院、教育部“中德职教汽车机电合作项目”试点院校，现拥有3个国家级高等职业教育专业教学资源库（含1个备选项目）。</span
        >
        <span>创新环境优渥，发展后劲十足。产教深度融合，信息特色鲜明。</span>
        <span>创新环境优渥，发展后劲十足。产教深度融合，信息特色鲜明。</span>
        <span>创新环境优渥，发展后劲十足。产教深度融合，信息特色鲜明。</span>
        <div class="follow" @click="QRCodes()" >
           <p>关注智慧校园</p>
        </div>
        <div class="QRCode" v-show="data.QRCodew">
            <img src="" alt="">
        </div>
        <div>11111111111111111111111111111111111111111</div>
      </div>
    </div>
  </div>
</template>
<script>
import {reactive,} from "@vue/composition-api"
export default {
    setup(props,context){
        const data = reactive({
           QRCodew:false,
        })
      //方法区域
      const  QRCodes = () => {
         if(!data.QRCodew){
             data.QRCodew = true;
         }else{
             data.QRCodew = false;
         }
      } 
       return{
          data,
          QRCodes,
       }
    }
};
</script>
<style lang="scss" scoped>
.HeadUp-wrap {
  width: 100%;
  height: 500px;
  background-color: #000;
}
.OutsideThePicture {
  width: 100%;
  height: 430px;
  background-image: url("../../../assets/login_img/login_bg.jpg");
  background-repeat: no-repeat;
  background-position: center 0;
  @include webkit(background-size, cover);
}
.HeadUp-wrap-operation {
  width: 100%;
  line-height: 70px;
}
.logo-img {
  margin-left: 60px;
}
.layout {
  padding-right: 40px;
  cursor: pointer;
  &:hover {
    color: aqua;
  }
}
/********************************************************************************** */
//中间外层样式
.middle-wrap {
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.middle-wrap-title {
  margin-top: 60px;
  h1 {
    font-size: 30px;
    font-weight: bold;
    color: #009999;
  }
  span {
    display: block;
    margin-top: 30px;
  }
  .follow{    
      width:200px;
      height:40px;
      border-bottom:3px solid #E0E0E0;
      font-size:25px;
      margin: 30px auto;
      cursor:pointer;
      &:hover{
          border-bottom:3px solid #FFFF00;
      }
      p{
          line-height:40px;
      }
  }
.QRCode{
          width:200px;
          height:200px;
          position:absolute;
          margin:0 auto;
          left:401px;
          top:367px;
          background-color:aqua;
          z-index: 1;
      }  
}
</style>