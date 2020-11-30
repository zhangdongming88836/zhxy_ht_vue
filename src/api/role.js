//获取角色列表信息和搜索的api
import service from "@/utils/Interceptor.js";
export function  RoleList(data){
    return  service.request({
        method:"post",
        url:"/web/role/list",
        data
    })
}
//删除角色的api
export function RoleDelete(data){
    return  service.request({
        method:"post",
        url:"/web/role/delete",
        data
    })
}
//获取添加树数据的api
export function TreeData(data){
    return  service.request({
        method:"get",
        url:"/web/menu/roleMenuTreeData",
        data
    })
}
//发送添加数据的api
export function UserInsert(data){
    return  service.request({
        method:"post",
        url:"/web/role/insert",
        data
    })
}
//发送id获取编辑信息的api
export function RoleEdit(data){
    return  service.request({
        method:"get",
        url:`/web/role/edit/${data.roleId}`,
        data
    })
}
//发送编辑数据api
export function RoleUpdate(data){
    return  service.request({
        method:"post",
        url:"/web//role/update",
        data
    })
}