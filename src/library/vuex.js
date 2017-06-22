import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App'     
import axios from 'axios'
import VueAxios from 'vue-axios'
// 将vuex注入到Vue，所有的组件都可以
// this.$store
Vue.use(Vuex)
Vue.use(VueAxios, axios)

// 返回唯一的一个stire实例，状态仓库
const store = new Vuex.Store({
    // 状态
    state: {
        showBanner: { 'data': []},
        displayHeader: true,
    },
    mutations: {

    },
    actions: {
     getInitShowBanner() {
       return new Promise((resolve, reject) => {
        Vue.axios.get('http://api.bilibili.com/x/web-show/res/loc?callback=jQuery17205969745067413896_1482805801285&jsonp=jsonp&pf=0&id=23&_=1482805801599')
          .then(res => {
            // resolve(res.data.showBanner)
            console.log(res.data)
          })
      })
     },
    }

})
export default store