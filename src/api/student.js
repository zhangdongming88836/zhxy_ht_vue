import service from "@/utils/Interceptor.js";
//获取学生列表和搜索结果列表api
export function GradeList(data){
   return service.request({
       method:"post",
       url:"/web/grade/list",
       data
   })
}
//获取课程的api
export function GradeToList (data){
    return service.request({
        method:"get",
        url:"/web/grade/toList",
        data
    })
 }
 //获取选择课程的数组
 export function GradeToInsert(){
    return service.request({
        method:"get",
        url:"/web/grade/toInsert",
    })
 }
 //发送添加的数据
 export function GradeInsert(data){
    return service.request({
        method:"post",
        url:"/web/grade/insert",
        data
    })
 }
 //获取编辑的数据
 export function GradeEdit(data){
    return service.request({
        method:"get",
        url:`/web/grade/edit/${data.gradeId}`,
    })
 }
 //发送编辑好的数据
 export function GradeUpdate(data){
    return service.request({
        method:"post",
        url:'/web/grade/update',
        data
    })
 }
 //删除api
 export function GradeDelete(data){
    return service.request({
        method:"post",
        url:'/web/grade/delete',
        data
    })
 }