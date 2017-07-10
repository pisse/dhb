<template>
  <div id="app" class="safety">
    <!--<router-view></router-view>-->
    <!--<x-header :left-options="{backText: ''}">我的账户</x-header>-->
    <div class="img-wrap">
      <div class="content">
        <img width="100%" src="../../assets/imgs/deadline.jpg" alt="">
      </div>
    </div>

    <div class="item">
      <h3 class="title">
        消费金融贷
      </h3>
      <div class="content repayment-1">
        <p>华肖科技已与所有债权提供方签署连带责任本息担保条款，并受到《中华人民共和国担保法》保护。一旦第一还款人（如：申请手机分期的消费者）欠款，华肖科技当日立刻向第二还款人（借款人推荐方）发起追偿。</p>
        <!--<img width="60%" alt="" src="../../assets/imgs/safe-1.jpg">-->
      </div>
    </div>

    <!--<v-footer type="home"></v-footer>-->
  </div>
</template>

<script>
import vFooter from '../../components/footbar'
import { Tab, Loading, TabItem, Group, Cell, ButtonTab, ButtonTabItem, XHeader, XButton } from 'vux'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.getProfile()
    })
  },
  created () {
  },
  methods: {

  },
  components: {
    vFooter,
    Tab,
    TabItem,
    Group,
    Cell,
    ButtonTab,
    ButtonTabItem,
    XHeader,
    XButton,
    Loading
  }
}
</script>

<style lang="less">
  @import '../../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';

  .safety{
    background-color: #ededed;
    min-height: 100vh;
    font-size: 12px;
    .img-wrap{
      .content{
        margin-bottom: 10px;
        font-size: 0;
      }
    }

    .item{
      background-color: #fff;
      .title{
        color: rgb(51,51,51);
        font-size: 15px;
        font-weight: bold;
        padding: .5333333333rem 1em;
        border-bottom: 1px solid #e5e5e5;
      }
      .content{
        padding: 15px;
        font-size: 14px;
        img{
          margin: 1em auto 0;
          display: block;
        }
      }

    }
  }
</style>
