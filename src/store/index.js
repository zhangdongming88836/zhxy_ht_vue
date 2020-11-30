import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import curriculum from "./modules/curriculum.js"
import  login from "./modules/login.js"
export default new Vuex.Store({
   modules:{
    curriculum,
    login,
   }
});
