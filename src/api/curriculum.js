import service from "@/utils/Interceptor.js";
//获取课程和搜索结果api
export function CourseList(data){
    return service.request({
        method:"post",
        url:"/web/course/list",
        data
    })
}
//获取教学教师的api
export function CourseToList(){
    return service.request({
        method:"get",
        url:"/web/course/toList",
    })
}
//获取老师和班级数据的api
export function CourseToInsert(){
    return service.request({
        method:"get",
        url:"/web/course/toInsert"
    })
}
//发送添加的数据
export function CourseInsert(data){
    return service.request({
        method:"post",
        url:"/web/course/insert",
        data
    })
}
//删除课程
export function CourseDelete(data){
    return service.request({
        method:"post",
        url:"/web/course/delete",
        data
    })
}
//编辑获取数据
export function CourseEdit(data){
    return service.request({
        method:"get",
        url:`/web/course/edit/${data.courseId}`,
    })
}
//发送编写好的数据api
export function  CourseUpdate(data){
    return service.request({
        method:"post",
        url:"/web/course/update",
        data
    })
}