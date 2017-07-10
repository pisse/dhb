<template>
  <div class="platform">
    <!--<router-view></router-view>-->

    <!--<div class="btn-wrap follow">
      <x-button type="primary" @click.native="loginOut">退出登录</x-button>
    </div>-->

    <div class="item">
      <h3 class="title">
        公司简介
      </h3>

      <div class="content" style="display: block;">
        <!--大户宝，是上海华肖网络科技有限公司旗下平台，-->
        上海华肖网络科技有限公司，致力于以互联网先进技术来实现普惠金融，快速、便捷、安全的撮合个人之间的小额借贷交易。
        平台秉承“安全大于收益，合法合规经营”的宗旨，坚持网络借贷信息中介机构的平台定位，
        专注于为高净值用户提供优质个人小额消费信贷债权、真实透明的风险控制信息、安全稳健的交易系统，
        让用户资金得到安全稳定的收益，让普惠金融触手可及。
      </div>

    </div>

  </div>
</template>

<script>
import vFooter from '../../components/footbar'
import { Tab, Loading, TabItem, Group, Cell, ButtonTab, ButtonTabItem, XHeader, XButton } from 'vux'
// import Services from '../../common/js/services'
import _request from '../../common/js/request'

export default {
  mixins: [_request],
  name: 'app',
  data () {
    return {
      profile: {}
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
    onItemClick (index) {
      if (index == 0) {
        this.$router.replace({name: 'platform'})
      } else if (index == 1) {
        this.$router.replace({name: 'creditor'})
      }
      console.log(index)
    }
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
  @import '../../assets/less/base.less';

  .platform{
    background-color: #ededed;
    min-height: 100vh;
    font-size: 12px;
    .img-wrap{
      .content{
        width: 100%;
      }
    }
    .item{
      background-color: #fff;
      .title{
        color: rgb(51,51,51);
        font-size: 1.3333333333em;
        font-weight: bold;
        padding: .5333333333rem 1em;
        border-bottom: 1px solid #e5e5e5;
      }
      .content{
        padding: 15px;
        font-size: 14px;
      }
    }

  }
</style>
