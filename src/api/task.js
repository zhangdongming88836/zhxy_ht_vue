import service from "@/utils/Interceptor.js";
//获取学生列表和搜索结果列表api
export function Joblist(data){
   return service.request({
       method:"post",
       url:"/web/job/list",
       data
   })
}
//搜索下拉框数据
export function JobToList(data){
    return service.request({
        method:"get",
        url:"/web/job/toList",
        data
    })
 }
 //编辑信息的接口
 export function JobEdit(data){
    return service.request({
        method:"get",
        url:`/web/job/edit/${data.jobId}`,
    })
 }
//确定发送
export function JobUpdate(data){
    return service.request({
        method:"post",
        url:"/web/job/update",
        data
    })
 }
 //删除api
 export function JobDelete(data){
    return service.request({
        method:"post",
        url:"/web/job/delete",
        data
    })
 }

