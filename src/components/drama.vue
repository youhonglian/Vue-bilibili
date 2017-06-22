<template>
  <div class="wrapper">
      <v-swiper></v-swiper>
      <div class="classify">
          <span class="drama">追番</span>
          <span class="showlist">放送表</span>
          <span class="index">索引</span>
      </div>

      <p class="totalRecommond">
          <img src="../assets/image/drama.png" alt="">
          <span class="recommond">新番连载</span>
          <span class="right">连载所有 ></span>
      </p>

      <div class="show-content">
        <div class="showItem col-xs-4" @click="playDetail(item.season_id)" v-for="item in dramaList" >
            <img :src="item.cover" alt="" class="showImg">    
            <div class="showInfo">
                <span class="showTitle">{{item.title}}</span>  
                <p class="showNum">更新至第{{item.newest_ep_index}}话</p>
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
    computed: {
        dramaList () {
            return this.$store.state.dramaList
        }
    },
    created () {
         this.axios.get('https://api.imjad.cn/bilibili/?get=rank&content=global')
            .then (res => {    
                this.$store.state.dramaList = res.data.result.list;
         })
    },
    methods: {
          playDetail(season_id) {
            this.$router.push(
                 {name: 'dramaPlay', params: {'season_id': season_id}}
             )
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/drama.scss';

</style>