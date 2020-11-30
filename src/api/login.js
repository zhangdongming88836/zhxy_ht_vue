import service from "@/utils/Interceptor.js"
//登录api
export function Login(data){
  return service.request({
      method:"post",
      url:"/web/login",
      data
  })
}
//获取验证码api
export function Hcode(data){
    return service.request({
        method:"get",
        url:"/web/check",
        data
    })

}
//退出API
export function Logout(){
    return service.request({
        method:"get",
        url:"/web/logout",
    })
}
//获取系统菜单API
export function Menu(){
    return service.request({
        method:"get",
        url:"/web/menu/indexMenu"
    })
}                                   