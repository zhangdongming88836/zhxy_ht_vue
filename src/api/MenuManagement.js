//获取菜单管理信息
import service from "@/utils/Interceptor.js";
export function  MenuList(data){
    return  service.request({
        method:"post",
        url:"/web/menu/list",
        data
    })
}
/******添加接口***** */
export function  MenuInsert(data){
    return  service.request({
        method:"post",
        url:"/web/menu/insert",
        data
    })
}
/*******删除接口******* */
export function  MenuDelete(data){
    return  service.request({
        method:"post",
        url:"/web/menu/delete",
        data
    })
}
//获取编辑信息
export function  MenuEditMenuId(data){
    return  service.request({
        method:"get",
        url:`/web/menu/edit/${data.menuId}`,
    })
}
//发送已编辑数据
export function  MenuUpdate(data){
    return  service.request({
        method:"post",
        url:'/web/menu/update',
        data
    })
}