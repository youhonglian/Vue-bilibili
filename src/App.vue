<template>
  <div id="app">
    <v-header></v-header>
  </div>
</template>

<script>
import vHeader from '@/components/header.vue'
export default {
  name: 'app',
  components: {
    vHeader
  },
  computed: {
        showList() {
             return this.$store.state.showList;           
        }
  },
  mounted() {
    console.log("%c Powered by Youhonglian - youhonglian.github.io","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #f44336),color-stop(0.15, #f44336), color-stop(0.29, #FA7198),color-stop(0.3, #AA00FF),color-stop(0.4, #FA7198), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #FA7198),color-stop(0.9, #FA7198), color-stop(1, #FA7198));color:transparent;-webkit-background-clip:text;font-size:13px;");
  }
}
</script>

<style lang="css">
@import 'assets/css/reset.css';

</style>
