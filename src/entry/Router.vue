<template>
  <transition :name="transitionName">
    <keep-alive>
      <router-view class="container"></router-view>
    </keep-alive>
  </transition>
    <!--<v-footer type="home"></v-footer>-->
</template>

<script>
export default {
  name: 'router',
  data () {
    return {
      transitionName: 'slide',
      data: {}
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = (toDepth < fromDepth || to.path === '/') ? 'fade' : 'slide'
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="less">
  .container{
    position : absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    &.slide-enter-active, &.slide-leave-active{
      transition : all .3s linear;
    }
    &.slide-leave-active{
      opacity: 0;
    }

    &.slide-enter {
      transform: translate3d(100%, 0, 0);
    }
    &.slide-leave-active{
      transform: translate3d(-100%,0, 0);
    }

    &.fade-leave-active{
      transition : all .2s linear;
    }
    &.fade-enter-active{
      transition : all .1s linear 0.1s;
    }

    &.fade-enter {
      opacity: 0;
    }
    &.fade-leave-active{
      transform: translate3d(100%,0, 0);
      opacity: 0;
    }

  }

</style>
