const state = {
   username:"" ,
   userimg:""
}
const getters = {
    username: state => state.username,
    userimg: state => state.userimg,
}
const mutations = {
  SET_USERNAME(state,value){
     state.username = value
  },
  SET_USERIMG(state,value){
     state.userimg = value
  }
}
const actions = {}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}