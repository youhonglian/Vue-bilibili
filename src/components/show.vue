<template>
  <div class="showpage">
      <v-swiper class="swiper" :message= "banner"></v-swiper>
      <div class="banner-item">
            <div class="item follow">
                <img src="../assets/image/heart.png" alt="" class="ico">
                <p class="item-info">关注主播</p>
            </div>
            <div class="item center">
                <img src="../assets/image/world.png" alt="" class="ico">
                <p class="item-info">直播中心</p>
            </div>
            <div class="item search">
                <img src="../assets/image/search.png" alt="" class="ico">
                <p class="item-info">搜索直播</p>
            </div>
            <div class="item classification">
                <img src="../assets/image/sort.png" alt="" class="ico">
                <p class="item-info">全部分类</p>
            </div>
      </div>
      <p class="totalshow">
          <img src="../assets/image/video.png" alt="">
          <span class="recommond">推荐主播</span>
          <span class="right">当前<span class="totalNum">5849</span>个主播  ></span>
      </p>
      <div class="aboutMe" @click="showMe">
                 <img src="../assets/image/me.png" alt="" class="me">
                 <img src="../assets/image/next.png" alt="" class="next">              
      </div>
      <transition name="fade">
            <div class="mask" v-show="isAbout"></div>                       
      </transition>
      <transition name="slide">
        <div class="about" v-if="isAbout" >
            <span class="close" @click="back">X</span>
            <div class="title">关于</div>
            <div class="name">游洪莲</div>
            <div class="job">求职意向: <span class="jobWanted">web前端工程师</span></div>
            <div > 
                <p class="job">个人信息: </p>
                <span class="jobDetail">东华理工大学(本科)</span></br>
                <span class="jobDetail">软件工程(2018毕业)</span></br>
                <span class="jobDetail">13257918110</span></br>
                <span class="jobDetail">994312463@qq.com</span>
            </div>
            <div>
                <p class="skill">技术栈:</p>
                <span class="skillDetail">
                    【前端】HTML/HTML5   CSS/CSS3   JavaScript(ES6,ES5)   SASS   Stylus   Vue.JS   AJAX   jQuery   微信小程序   Babel</br>
                    【后端】Node.js (express)</br>
                    【数据库】MongoDB</br>
                    【自动化构建】Webpack</br>
                    【版本管理】git
                </span>
            </div>
            <div class="desc">个人网站:
                <a href="http://youhonglian.github.io">Youuu</a>
            </div>
        </div>
      </transition>
      <div class="show-content">
        <div class="showItem col-xs-6" @click="showDetail(item.archive.aid)" v-for="item in showList" key="item.archive.aid">
            <img :src="item.pic" alt="" class="showImg">    
            <div class="showInfo">
                <span class="showTag">#{{item.archive.tname}}#</span>
                <span class="showTitle">{{item.archive.title}}</span>
                <div class="showUser">
                    <span class="showAuthor">{{item.archive.owner.name}}</span>
                    <i class="fa fa-eye" aria-hidden="true"></i>
                    <span class="showNum">{{item.archive.stat.view}}</span>
                </div>
            </div>
       </div>
      </div>
  </div>
</template>

<script>
import vSwiper from '@/components/swiper.vue'
export default {
    data () {
        return {
            isAbout:'',
            props: {
                banner: Object 
             }
        }
    },
    components: {
        vSwiper,
    },
    computed: {
        showList() {
             return this.$store.state.showList;      
        },
        banner() {
            return this.$store.state.banner;  
        }
    },
    mounted () {
         this.axios.get('/api/show-list').then(res => {
                this.$store.state.showList = res.data.data;
             }).catch((error) => {
                console.log(error)
        })
         this.axios.get('/api/banner').then(res => {
                this.$store.state.banner = res.data.data;
             }).catch((error) => {
                console.log(error)
        })
    },
    methods: {
         showDetail(aid) {
             this.$store.state.displayHeader = false;
             this.$router.push(
                 {name: 'showPlay', params: {'aid': aid}}
             )
         },
        showMe() {
            this.isAbout = true;
        },
        back () {
            this.isAbout = false
        },
    }

}
</script>

<style lang="scss" scoped>
@import '../assets/css/show.scss';

</style>