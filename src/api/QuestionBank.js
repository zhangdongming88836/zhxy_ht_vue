
import service from "@/utils/Interceptor.js";
//下拉框的数据
export function  TopicToList(){
    return  service.request({
        method:"get",
        url:"/web/topic/toList",
    })
}
//获取数据
export function  TopicList(data){
    return  service.request({
        method:"post",
        url:"/web/topic/list",
        data
    })
}
//发送
export function  TopicInsert(data){
    return  service.request({
        method:"post",
        url:"/web/topic/insert",
        data
    })
}
//删除
export function  TopicDelete(data){
    return  service.request({
        method:"post",
        url:"/web/topic/delete",
        data
    })
}
//获取编辑信息
export function  TopicEdit(data){
    return  service.request({
        method:"get",
        url:`/web/topic/edit/${data.topicId}`,
    })
}
//发送编辑数据
export function  TopicUpdate(data){
    return  service.request({
        method:"post",
        url:'/web/topic/update',  
        data
    })
}