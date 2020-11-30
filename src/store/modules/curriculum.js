//curriculum 布局的意思 这个js用与改变后台 头部 导航 内容 的宽度  的vux
const state = {
    isCollapse: JSON.parse(window.sessionStorage.getItem("isCollapse")) || false,
}
const getters = {
    isCollapse: state => state.isCollapse,
}
const mutations = {
    SET_ISCOLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        //html5本地储存
        window.sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    },
}
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}