<template>
    <div class="headpage">
        <div class="b-header" v-if="($route.name !== 'showPlay' )  && ($route.name !== 'dramaPlay') && ($route.name !== 'recommondPlay') && ($route.name !== 'searchList')" :style="{backgroundColor: skinColor}">
            <i class="fa fa-bars" aria-hidden="true" @click="toggleSidebar"></i>
            <img src="http://i0.hdslb.com/bfs/face/2c3a364cf409a85b4c651a6afbf6ffe22208c654.jpg" @click="toggleSidebar" alt="" class="b-avatar">
            <span class="b-username" @click="toggleSidebar">honeyvickys</span>
            <div class="right">
                <i class="fa fa-gamepad" aria-hidden="true"></i>
                <i class="fa fa-download" aria-hidden="true"></i>  
                <i class="fa fa-search" aria-hidden="true" @click="searchShow"></i>
            </div>
            <div class="b-navbar">
                <ul>
                    <li class="b-show">
                        <router-link to="/show">直播</router-link>
                    </li>
                    <li class="b-recommond">
                        <router-link to="/recommond">推荐</router-link>
                    </li>
                    <li class="b-drama">
                        <router-link to="/drama">番剧</router-link>
                    </li>
                    <li class="b-partition">
                        <router-link to="/partition">分区</router-link>
                    </li>
                    <li class="b-follow">
                        <router-link to="/follow">关注</router-link>
                    </li>
                    <li class="b-find">
                        <router-link to="/find">发现</router-link>                        
                    </li>
                </ul>
             </div>
        </div>
        <div class="b-content">
            <router-view></router-view>
        </div>
        <transition name="fold">
            <div class="b-sidebar" v-if="sidebarShow">
                <div class="b-user" :style="{backgroundColor: skinColor}">
                    <img src="http://i0.hdslb.com/bfs/face/2c3a364cf409a85b4c651a6afbf6ffe22208c654.jpg" alt="">                    
                    <div class="icon" style="color: white">
                        <i class="fa fa-envelope" aria-hidden="true"></i>   
                        <i class="fa fa-moon-o" aria-hidden="true" @click="changeColor('black')" v-if="isShowSkin"></i>
                        <i class="fa fa-sun-o" aria-hidden="true" @click="changeColor('#FA7198')" v-if="!isShowSkin"></i>
                    </div>  
                    <div class="user-desc">
                        <div>
                            <span class="user-username">honeyvickys</span>
                            <span class="user-grade">LV2</span>
                        </div> 
                        <span class="user-vip" :style="{Color: skinColor}">正式会员</span>                                      
                        <div class="user-money">
                            <span class="user-coin">硬币:  9.00</span>
                            <span class="user-bcoin">B币:  0.00</span>
                        </div> 
                    </div>                    
                </div>
                <div class="b-sideItem">
                    <ul class="side-List">
                        <mt-cell-swipe title="首页"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s1.png">
                        </mt-cell-swipe>
                        <mt-cell-swipe title="我的大会员"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s2.png" width="24" height="24">
                        </mt-cell-swipe>
                         <mt-cell-swipe title="会员积分"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s3.png" width="24" height="24">
                        </mt-cell-swipe>
                         <mt-cell-swipe title="离线缓存"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s4.png" width="24" height="24">
                        </mt-cell-swipe>
                         <mt-cell-swipe title="我的收藏"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s5.png" width="24" height="24">
                        </mt-cell-swipe>
                         <mt-cell-swipe title="历史记录"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s6.png" width="24" height="24">
                        </mt-cell-swipe>
                         <mt-cell-swipe title="我的关注"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s7.png" width="24" height="24">
                        </mt-cell-swipe>
                         <mt-cell-swipe title="B币钱包"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s8.png" width="24" height="24">
                        </mt-cell-swipe>
                          <mt-cell-swipe title="主题选择"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s9.png" width="24" height="24">
                        </mt-cell-swipe>
                         <mt-cell-swipe title="应用推荐"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s10.png" width="24" height="24">
                        </mt-cell-swipe>
                         <mt-cell-swipe title="设置与帮助"  >
                             <span></span>
                             <img class="tag" slot="icon" src="../assets/image/s11.png" width="24" height="24">
                        </mt-cell-swipe>
                     </ul>                 
                </div>
            </div>
        </transition>
        <transition name="fade">
                <div class="mask" v-show="sidebarShow" @click="toggleSidebar"></div>
        </transition>
        <transition name="slide">
            <div class="search" v-if="searchbarShow">
                <div class="b-searchbar" >
                    <i class="fa fa-arrow-left" aria-hidden="true" @click="back"></i>
                    <input type="search" placeholder="搜索视频，番剧，up主或av号" v-model="keywords" @keypress.enter="searchSub">
                    <i class="fa fa-search" aria-hidden="true" @click="searchSub"></i>           
               </div>
                <div class="searchList" v-show="isListShow">    
                    <ul>
                        <li v-for="list in searchList" @click="searchPlay(list.aid, list.title, list.description)">
                            <img :src="list.pic" alt="" class="pic">
                            <span class="title">{{list.title}}</span>
                            <span class="author">{{list.author}}</span>
                        </li>
                    </ul>
                </div>
            </div>
           
        </transition>
        <transition name="fade">
                <div class="mask" v-show="searchbarShow" @click="toggleSearchbar"></div>                       
        </transition>

    </div>
</template>

<script>
export default {
    data () {
        return {
            sidebarShow: false,
            isShowSkin: true,
            keywords: '',
        }
    },
    created () {
         this.axios.get('/api/show-list')
            .then (res => {    
                this.$store.state.showList = res.data.showList;
         })
    },
    computed: {
        skinColor() {
             return this.$store.state.skinColor;
        },
        showList() {
             return this.$store.state.showList;        
        },
        searchList() {
            return this.$store.state.searchList;
        },
        isListShow() {
            return this.$store.state.isListShow;             
        },
        searchbarShow() {
            return this.$store.state.searchbarShow;             
        },
    },
    methods: {
        toggleSidebar () {
            this.sidebarShow = ! this.sidebarShow
        },
        toggleSearchbar () {
            this.$store.state.searchbarShow  = ! this.$store.state.searchbarShow 
        },
        searchShow () {
             this.$router.push(
                 { path: '/#/search'}
             )
             this.$store.state.searchbarShow = ! this.$store.state.searchbarShow
        },
        searchSub () {
             let keywords = this.keywords
             this.util.openIndicator()
             this.axios.post('https://api.imjad.cn/bilibili/?get=search&keyword=' + keywords ).then((res) => {
                this.util.closeIndicator()
                this.$store.state.searchList = res.data.result.video
                this.$store.state.isListShow = true
             }).catch((error) => {
                this.util.pop()
                this.keywords = ''
             })
        },
        searchPlay (aid, title, description) {
             this.$router.push(
                     {name: 'searchList', params: {'aid': aid}}
             )
             this.$store.state.searchTitle = title
             this.$store.state.searchDesc = description
             this.$store.state.isListShow = false;
             this.$store.state.searchbarShow = false;
        },
        changeColor (color) {
            this.$store.commit('changeColor', color)
            this.isShowSkin = ! this.isShowSkin
            localStorage.skinColor = color;
        },
        back () {
            this.$router.push(
                 {name: 'show'}
            )
            this.$store.state.searchbarShow  = false
            this.$store.state.isListShow  = false
            
        },

    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/header.scss';
</style>