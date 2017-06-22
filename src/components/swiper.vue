<template>
    <div class="wrap">
        <div class="swipe">
             <mt-swipe :auto="1500">
                <mt-swipe-item name="i" v-for="data in banner" key="data.id">
                     <img :src="data.pic">
                </mt-swipe-item>         
             </mt-swipe>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    computed: {
         banner () {
             return this.$store.state.banner
         }
    }
   

}
</script>

<style lang="scss" scoped>
@import '../assets/css/swiper.scss';
</style>