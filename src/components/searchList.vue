<template>
  <div class="wrapper">
       <div class="float-bar" >  
                <router-link to="/">
                    <i class="fa fa-arrow-left" aria-hidden="true" @click="back"></i>                
                </router-link>
                <span>av{{aid}}</span>
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
      </div>
      <div>
            <video controls="controls" :src="videoSrc"  class="video"></video>                  
      </div>
       <div class="description">
          <div class="bar">
              <ul>
                  <li class="info" @click="toggleInfo()">
                     简介
                  </li>
                  <li class="comment" @click="toggleComment()"  >
                      评论({{comment.length}})
                  </li>
              </ul>              
          </div>
      </div>  

       <div class="content">
          <div class="showInfo" v-show="isInfoShow" >
              <!--无简介-->
              <p class="title">{{searchTitle}}</p>
              <p class="desc">{{searchDesc}}</p>
              <p class="about">标签相关</p>
              <span class="tag" v-for="item in info">{{item.tag_name}}</span>
              <!--<p class="desc" v-for="item in info">{{item.content}}</p>-->
          </div>
          <div class="ShowComment" v-show="isCommentShow" >
              <ul class="cmtList">
                  <li v-for="(cmt, index) in comment">
                      <img :src="cmt.member.avatar" alt="" class="avatar">
                      <span class="name">{{cmt.member.uname}}</span>
                      <span class="ico" >   
                        <i class="fa fa-thumbs-o-up" aria-hidden="true" @click="star(index)"></i>{{cmt.like}}        
                      </span>
                      <p class="comment">{{cmt.content.message}}</p>
                  </li>
              </ul>
            <div class="talk">
                <img src="../assets/image/emoji.png" class="emoji"></img>
                <input type="text" v-model="cmtContent" @keypress.enter="submitCmt"  placeholder="说点什么">
                <img src="../assets/image/send.png" class="send" @click="submitCmt">
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isInfoShow: true,
      isCommentShow: false,
      aid: this.$route.params.aid,
      videoSrc: '',
      comment: '',
      isStar: [{true: true}],
      cmtContent: '',
      info: ''
    }
  },
  computed: {
    searchTitle () {
        return this.$store.state.searchTitle
    },
    searchDesc () {
        return this.$store.state.searchDesc
    }
  },
  mounted() {
         let aid =  this.$route.params.aid
         this.axios.post('https://api.imjad.cn/bilibili/?aid='+ aid +'&page=1&quality=2').then((res) => {
                this.videoSrc = res.data.durl[0].url
             }).catch((error) => {
                console.log(error)
        })
  },
  created() {
        let aid =  this.$route.params.aid
        this.axios.get('/api/comments/' + aid).then(res => {
                this.comment = res.data.data.replies;
             }).catch((error) => {
                console.log(error)
        })
        this.axios.get('/api/search/' + aid).then(res => {
                this.info = res.data.data;
             }).catch((error) => {
                console.log(error)
        })
  },
  methods: {
     toggleInfo() {
        this.isInfoShow = true;
        this.isCommentShow = false;
    },
    toggleComment() {
        this.isInfoShow = false;
        this.isCommentShow = true;
     },
      star(index) {
         var fa = document.querySelectorAll('.ico')     
          if(this.isStar[index]) {
                 this.comment[index].like++;
                 fa[index].style.color="#FA7198"
                 this.isStar[index] = ! this.isStar[index]
             }else {
                 this.comment[index].like--;
                 fa[index].style.color="#AFAFAF"
                 this.isStar[index] = ! this.isStar[index]
             }
      },
     submitCmt() {
        let content = this.cmtContent;
        if(content === '') {
            this.util.cmtPop()
        }else {
            this.comment.unshift({
                    rpid: 274774377,
                    oid: 62894,
                    type: 1,
                    mid: 194205,
                    root: 0,
                    parent: 0,
                    count: 0,
                    rcount: 0,
                    floor: 22,
                    state: 0,
                    attr: 0,
                    ctime: 1496467863,
                    rpid_str: "274774377",
                    root_str: "0",
                    parent_str: "0",
                    like: 0,
                    action: 0,
                    member: {
                        mid: "194205",
                        uname: "honeyvickys",
                        sex: "女",
                        sign: "喜欢看影视、玩游戏，对动漫非常感兴趣一位绅士。新浪微博：@怪蜀黍桃太郎",
                        avatar: "http://i0.hdslb.com/bfs/face/2c3a364cf409a85b4c651a6afbf6ffe22208c654.jpg",
                        rank: "10000",
                        DisplayRank: "0",
                        level_info: {
                            current_level: 5,
                            current_min: 10800,
                            current_exp: 27703,
                            next_exp: 28800
                        },
                        pendant: {
                            pid: 0,
                            name: "",
                            image: "",
                            expire: 0
                            },
                        nameplate: {
                            nid: 9,
                            name: "出道偶像",
                            image: "http://i2.hdslb.com/bfs/face/3f2d64f048b39fb6c26f3db39df47e6080ec0f9c.png",
                            image_small: "http://i2.hdslb.com/bfs/face/90c35d41d8a19b19474d6bac672394c17b444ce8.png",
                            level: "高级勋章",
                            condition: "所有自制视频总播放数>=50万"
                        },
                        official_verify: {
                            type: -1,
                            desc: ""
                        },
                        vip: {
                            vipType: 1,
                            vipDueDate: 1496937600000,
                            dueRemark: "5天之后就要收回特权了哦，快去续费吧！",
                            accessStatus: 1,
                            vipStatus: 1,
                            vipStatusWarn: ""
                        }
                    },
                    content: {
                        message: `${content}`,
                        plat: 1,
                        device: "",
                        members: [ ]
                    },
                    replies: []
            })
        }
        this.cmtContent = ''
     },
     back() {
         this.$store.state.searchbarShow = true
         this.$store.state.isListShow = true
     }
  }
  
}
</script>

<style lang="scss" scoped>
@import '../assets/css/searchList.scss';

</style>