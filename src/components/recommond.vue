<template>
  <div class="wrapper">
       <v-swiper class="swiper"></v-swiper>
       <p class="totalRecommond">
          <img src="../assets/image/recommond.png" alt="">
          <span class="recommond">热门推荐</span>
          <img src="../assets/image/rank.png" alt="" class="ranking">
      </p>

      <div class="show-content">
        <div class="showItem col-xs-6" @click="playDetail(item.aid)" v-for="item in recommondList" key="item.aid">
            <img :src="item.pic" alt="" class="showImg">    
            <div class="showInfo">
                <span class="showTag">【{{item.typename}}】</span>
                <span class="showTitle">{{item.title}}</span>
                <div class="showUser">
                    <span class="showAuthor">{{item.author}}</span>
                    <i class="fa fa-eye" aria-hidden="true"></i>
                    <span class="showNum">{{item.play}}</span>
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
           }
    },
    components: {
        vSwiper,
    },
    created () {
         this.axios.get('/api/recommond-list')
            .then (res => {    
                this.$store.state.recommondList = res.data.list;
         })
    },
    computed: {
        recommondList() {
            return this.$store.state.recommondList
        }
    },
    methods: {
        playDetail(aid) {
            this.$router.push(
                 {name: 'recommondPlay', params: {'aid': aid}}
             )
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/recommond.scss';

</style>