<template>
  <div class="wrapper">
      <div class="float-bar" >  
                <router-link to="/recommond">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>                
                </router-link>
                <span>av{{list.aid}}</span>
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
      </div>
      <div v-for="item in recommond">
          <div v-for="key in item.durl">
              <div >
                    <video controls="controls" :src="videoSrc" :poster="list.pic" class="video"></video>                  
              </div>   
          </div>        
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
          <div class="showInfo" v-show="isInfoShow">
              <p class="title">{{list.title}}</p>
              <p class="desc">{{list.description}}</p>
              <p class="tagAll"> 
                    <span class="tagAbout">标签相关</span> 
                    <span class="tag" v-for="item in info">{{item.tag_name}}</span>                   
              </p>
          </div>
          <div class="ShowComment" v-show="isCommentShow"   >
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
  data() {
      return {
           isInfoShow: true,
           isCommentShow: false,
           comment: [ ],
           recommond: [
            {
                from: "local",
                result: "suee",
                format: "hdmp4",
                timelength: 185481,
                accept_format: "flv,hdmp4,mp4",
                accept_quality: [
                    3,
                    2,
                    1
                ],
                seek_param: "start",
                seek_type: "second",
                durl: [
                {
                    order: 1,
                    length: 185481,
                    size: 20252646,
                    url: "https://cn-sdjn-dx-v-02.acgvideo.com/vg5/e/b2/279786-1-hd.mp4?expires=1496561100&platform=pc&ssig=KJcDtt7zUArRDbaBFTBIGw&oi=1985593072&nfa=oq9sEqY95srmC3Zf+3700A==&dynamic=1&hfa=2063642420",
                    backup_url: [
                        "https://ws.acgvideo.com/8/60/104091-1.mp4?wsTime=1496404518&platform=pc&wsSecret2=bb90a0763d7e3f673ce1edf0bbe1b34b&oi=1985593072&rate=7"
                    ]
                }
             ]
            }
           ],
           videoSrc: '',
           aid: '',
           isStar: [{true: true}],
           cmtContent: '',
           info: ''
           
      }
  },
  computed: {
    recommondList() {
        return this.$store.state.recommondList
    },
    list() {
        var recommondList = this.$store.state.recommondList
        for(var index = 0; index < recommondList.length; index++){
            if(recommondList[index].aid == this.$route.params.aid) {
                return recommondList[index]
            }
        }  
    },   
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
                console.log(this.info[0].content)
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
     }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/recommondPlay.scss';

</style>
