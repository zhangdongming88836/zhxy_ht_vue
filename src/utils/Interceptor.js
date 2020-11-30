import axios from "axios";
import {getToken,} from "@/utils/cookie.js"
import { Message } from 'element-ui';
import router from "@/router"
//创建axios, 赋给变量service
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/web';
const service = axios.create({
    baseURL:BASEURL,
    timeout:15000,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
   if(response.headers.error === "1"){
    Message({
      showClose: true,
      message: '错了哦，请先登录',
      type: 'error'
    });
    router.push({path:"/login"})
   }else if(response.headers.error === "2"){
    Message({
      showClose: true,
      message: '您没有权限,请联系管理员',
      type: 'error'
    });
    
   }else{
    return response;  
   }
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  export default service;