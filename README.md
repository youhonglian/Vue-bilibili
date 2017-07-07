# vue-bilibili-master

> A Vue.js project

## 项目描述

### 前端部分

   * 实现的Swiper, Toast,  Indicator组件 来自Mint-ui
   * 使用了Vue.js做单页应用
   * 使用了Vue Router处理路由请求
   * 使用了Axios做ajax请求
   * 使用了Vuex管理组件间的状态，实现非父子组件之间的通信
   * 皮肤状态通过localstorage存储

### 后端部分

  * 开发环境下使用了express处理路由
  
### 实现的功能

  * B站首页（轮播图、直播、推荐、番剧、排行榜、分区）
  * 切换主题（黑色和粉色的主题）
  * 搜索视频
  * 播放页面（简介、评论显示、发表评论、点赞、番剧选集）
  
  
### 项目展示
![image](https://github.com/youhonglian/Vue-bilibili/blob/master/src/assets/image/bilibili.gif)

### 在线预览
 https://youhonglian.github.io/vue-bilibili-master/#/



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
