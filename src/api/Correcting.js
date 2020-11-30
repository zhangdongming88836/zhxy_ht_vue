import service from "@/utils/Interceptor.js";
//获取下拉班级数据api
export function PushJobtTList(data){
    return service.request({
        method:"get",
        url:"/web/pushJob/toList",
        data
    })
}
//发送已选择班级数据返回课程的数据api
export function PushJobtGradeId(data){
    return service.request({
        method:"get",
        url:`/web/pushJob/cList/${data.gradeId}`,
        data
    })
}
//发送已选择课程数据返回作业的数据api
export function PushJobJList(data){
    return service.request({
        method:"get",
        url:`/web/pushJob/jList/${data.courseId}`,
        data
    })
}
//获取数据列表信息
export function PushJobList(data){
    return service.request({
        method:"post",
        url:'/web/pushJob/list',
        data
    })
}
// //删除
// export function PushJobDelete(data){
//     return service.request({
//         method:"post",
//         url:'/web/pushJob/delete',
//         data
//     })
// }