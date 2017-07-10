<template>
  <div>

    <tab>
      <tab-item :selected="$route.name=='platform'" @on-item-click="onItemClick">平台介绍</tab-item>
      <tab-item :selected="$route.name=='creditor'" @on-item-click="onItemClick">债权介绍</tab-item>
      <tab-item :selected="$route.name=='safety'" @on-item-click="onItemClick">还款保障</tab-item>
    </tab>

  <transition :name="transitionName">
    <keep-alive>
      <router-view class="container"></router-view>
    </keep-alive>
  </transition>
    <!--<v-footer type="home"></v-footer>-->
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

export default {
  name: 'router',
  data () {
    return {
      transitionName: 'slide',
      data: {},
      index: 0
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
    onItemClick (index) {
      this.index = index
      if (index == 0) {
        this.$router.replace({name: 'platform'})
      } else if (index == 1) {
        this.$router.replace({name: 'creditor'})
      } else if (index == 2) {
        this.$router.replace({name: 'safety'})
      }
    }
  },
  components: {
    Tab,
    TabItem
  }
}
</script>

<style lang="less">
  .container{
    position : absolute;
    top:44px;
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
