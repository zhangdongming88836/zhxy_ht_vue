import router from"./index.js";
import  {removeToken,getToken} from "@/utils/cookie.js";
import {Logout} from "@/api/login.js";
const  whiteRouter = ["/login"];//白名单//indexOf方法，判断数组是不是存在指定的某个对象
router.beforeEach((to,from ,next) => {
    if(getToken()){
        next();
        if(to.path == "/login"){
            Logout().then(response => {
                if(response.data.code == 200){
                    removeToken();
                }
            })
            next()
        }
    }else{
        //next("")
        //如果白名单里的是不是存在to存在1不存在等于-1
        if(whiteRouter.indexOf(to.path) !== -1){
            next(); //to  
        }else{
            next("/login") //路由指向
        }
    }
})