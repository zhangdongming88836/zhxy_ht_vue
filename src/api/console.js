import service from "@/utils/Interceptor.js";

//获取用户列表的api
export function userManagement(data){
    return service.request({
        method:"post",
        url:"/web/user/list",
        data
    })
}
//获取添加用户信息里面的角色api
export function  UserToInsert(){
    return service.request({
        method:"get",
        url:"/web/user/toInsert"
    })
}
//添加用户的请求api
export function  userInsert(data){
    return service.request({
        method:"post",
        url:"/web/user/insert",
        data
    })
} 
//判断用户名是否存在的接口
export function  VerifyUser(data){
    
    return service.request({
        method:"get",
        url:`/web/user/verifyLoginName/${data.LoginName}/${data.userId}`,
       
    })
} 
//获取编辑用户信息
export function  userEdit(data){
    console.log(data)
    return service.request({
        method:"get",
        url:`/web//user/edit//${data.userId}`,
       
    })
} 
//提交编辑用户信息
export function  UserUpdate(data){
   return service.request({
       method:"post",
       url:"/web/user/update",
       data
   })
}
//删除用户信息
export function UserDelete (data){
    return service.request({
        method:"post",
        url:"/web/user/delete",
        data
    })
}
//重置密码 
export function resetPasser(data){
    return service.request({
        method:"post",
        url:"/web//user/resetPwd",
        data
    })
}