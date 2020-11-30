/**
 * 过滤特殊字符
*/
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&% ;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 * 验证用户名
 */
export function calidateUser(user){
    let reg = /^([a-zA-Z-z0-9]){3,18}$/;
    return !reg.test(user) ? false : true
 }
/********************
 * 验证手机号
 */
export function calidatePhone(user){
  let reg = /^1[3-9][0-9]{9}$/;
  return !reg.test(user) ? false : true
}
/********************
 * 年龄
 */
export function calidateage(user){
  let reg = /^[0-9]{1,2}$/;
  return !reg.test(user) ? false : true
}
 /**
  * 验证密码
  */
 export function calidatePassword (pass){
   let reg = /^[a-zA-Z0-9]{6,18}$/
   return !reg.test(pass) ? false : true
 }
 /****
  * 验证邮箱
  */
 export function calidateEmail(email){
  let reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(email) ? false : true
}