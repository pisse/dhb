<template>
  <div class="footer">
    <a class="footer-item" :class="{cur: type=='index'}" :href="'index.html?r='+Math.random()"><i v-if="type=='index'" class="iconfont icon-shouye1"></i><i v-else class="iconfont icon-home"></i><br>首页</a>
    <a class="footer-item" :class="{cur: type=='list'}" :href="'list.html?r='+Math.random()"><i v-if="type=='list'" class="iconfont icon-xiangmu11"></i><i v-else class="iconfont icon-xiangmu"></i><br>产品</a>
    <a class="footer-item" :class="{cur: type=='home'}" :href="'home.html?r='+Math.random()"><i v-if="type=='home'" class="iconfont icon-morentouxiangicon"></i><i v-else class="iconfont icon-51wo"></i><br>我的</a>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .footer{
    position :fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    display : flex;
    background-color :#fff;
    font-size : 10px;
    line-height : 18px;
    border-top : 1px solid rgb(230,230,230)
    .footer-item{
      flex: 1;
      text-align :center;
      color: rgb(151,151,151);
      padding-top :5px;
      &.cur{
        color: #2257e4;
      }
    }
  }
</style>
<script type="text/ecmascript-6">

  export default {
    data () {
      return {
      }
    },
    props: {
      type: String
    },
    components: {
    }
  }
</script>
