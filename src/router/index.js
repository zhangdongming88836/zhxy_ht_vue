import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect:"login",
    hidden:true,
    meta:{
      name:"页面"
    }
  },
  {
    path: "/homePage",
    name: "homePage",
    hidden:true,
    meta:{
      name:"首页"
    },
    component: () => import("../views/Webpage/homePage/index.vue")
  },
  {
    path: "/login",
    name: "login",
    hidden:true,
    meta:{
      name:"登录"
    },
    component: () => import( "../views/login/index.vue")
  },
  {
    path:"/console",
    name:"console",
    redirect:"roleManagement",
    meta:{
      name:"首页",
      icon:"homePage"
    },
    component: () => import("../views/console/index.vue") 
  },
  {
    path:"/administration",
    name:"administration",
    meta:{
      name:"系统管理",
      icon:"system"
    },
    component: () => import ("../views/console/index.vue"),
    children:[
       {
        path:"/userManagement",
        name:"userManagement",
        meta:{
          name:"用户管理"
        },
        component: () => import("../views/console/system/userManagement/index.vue")
       },
       {
        path:"/roleManagement",
        name:"roleManagement",
        meta:{
          name:"角色管理"
        },
        component: () => import("../views/console/system/roleManagement/index.vue")
       },
       {
        path:"/menuRules",
        name:"menuRules",
        meta:{
          name:"菜单规则"
        },
        component: () => import("../views/console/system/menuRules/index.vue")
       },
    ],
  },
  {
    path:"/courseManagement",
    name:"courseManagement",
    meta:{
      name:"课程管理",
      icon:"curriculum"
    },
    component: () => import ("../views/console/index.vue"),
    children:[
       {
        path:"/curriculum",
        name:"curriculum",
        meta:{
          name:"我的课程"
        },
        component: () => import("../views/console/courseManagement/curriculum/index.vue")
       },
       {
        path:"/student",
        name:"student",
        meta:{
          name:"班级学生"
        },
        component: () => import("../views/console/courseManagement/student/index.vue")
       },
       {
        path:"/resources",
        name:"resources",
        hidden:true,
        meta:{
          name:"课程资源"
        },
        component: () => import("../views/console/courseManagement/resources/index.vue")
       },
       {
        path:"/task",
        name:"task",
        meta:{
          name:"作业管理"
        },
        component: () => import("../views/console/courseManagement/task/index.vue")
       },
       {
        path:"/questionBank",
        name:"questionBank",
        meta:{
          name:"题库管理"
        },
        component: () => import("../views/console/courseManagement/questionBank/index.vue")
       },
       {
        path:"/HomeworkOorrection",
        name:"HomeworkOorrection",
        meta:{
          name:"作业批改"
        },
        component: () => import("../views/console/courseManagement/HomeworkOorrection/index.vue")
       },
       {
        path:"/ClassMembers",
        name:"ClassMembers",
        hidden: true,
        meta:{
          name:"班级人员"
        },
        component: () => import("../views/console/courseManagement/ClassMembers/index.vue")
       },
       {
        path:"/addMenu",
        name:"addMenu",
        hidden: true,
        meta:{
          name:"添加系统"
        },
        component: () => import("../views/console/system/menuRules/addMenu/index.vue")
       },
    ],
  },
];

const router = new VueRouter({
  routes
});

export default router;
