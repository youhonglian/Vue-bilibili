// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex'
import mint from '@/library/mint'
import UtilJS from './assets/js/util.js'
Vue.prototype.util = UtilJS

Vue.use(VueAxios, axios);

Vue.use(Vuex);

Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        banner: [],
        showList: [],
        recommondList: [],
        skinColor: localStorage.skinColor || '#FA7198',
        searchList: '',
        dramaList: [],
        searchTitle: '',
        searchDesc: '',
        searchbarShow: false,
        isListShow: false

    },                                                                                                                                                                 
    mutations: {
        changeColor(state, color) {
             state.skinColor = color;
        } 
    },
    actions: {

    }

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



