<template>
  <div id="app" class="profile">
    <!--<router-view></router-view>-->
    <x-header :left-options="{backText: ''}">我的账户</x-header>
    <h2 class="name"></h2>
    <group label-width="4.5em" label-margin-right="2em" label-align="left">
      <cell title="实名认证"  value-align="right" is-link link="/identity">{{profile.idcard_name}}
      <i class="iconfont" :class="{'icon-shenhezhong': authStatus==1, 'icon-yirenzheng2': authStatus==10,  'icon-iconfontyuanjiaojuxing1eps': authStatus===0} "></i></cell>

      <cell title="手机号码" v-if="profile.phone" :value="profile.phone"  value-align="right"></cell>
      <cell title="手机号码" v-else value=""  value-align="right" link="/mobile"></cell>

     <!-- <cell title="身份证" v-if="!profile.idcard" value=""  is-link value-align="right" link="/identity"></cell>
      <cell title="身份证" v-else :value="profile.idcard"  value-align="right"></cell>-->


      <cell title="银行卡"  is-link :value="cardlength" value-align="right" link="/cardlist"></cell>
      <cell title="交易密码" value="" is-link value-align="left" link="/chgpwd"></cell>
    </group>

    <!--<div class="btn-wrap follow">
      <x-button type="primary" @click.native="loginOut">退出登录</x-button>
    </div>-->

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>

    <div class="info">
      1、请您认真填写本人身份证和真实姓名，并将您的身份证正反面拍照或扫描给公众号，我们将尽快审核;
      <br>
      2、请务必填写您本人手机号码，我们将与您保持联系;
      <br>
      3、请绑定一张您的个人银行卡，银行卡户名与真实姓名务必一致，我们将通过此卡保持您的资金同卡进出;
      <br>
      4、以上资料填写完整且审核通过后，您可以在平台上进行操作。
    </div>


    <!--<v-footer type="home"></v-footer>-->
  </div>
</template>

<script>
import vFooter from '../../components/footbar'
import { Tab, Loading, TabItem, Group, Cell, ButtonTab, ButtonTabItem, XHeader, XButton } from 'vux'
import Services from '../../common/js/services'
import _request from '../../common/js/request'

export default {
  mixins: [_request],
  name: 'app',
  data () {
    return {
      isAuth: false,
      authStatus: '', // 0未认证，1认证中 10认证成功
      profile: {}
    }
  },
  computed: {
    cardlength () {
      let len = ''
      if (this.profile.bankcard && this.profile.bankcard.length > 0) {
        len = '(' + this.profile.bankcard.length + ')'
      } else {
        len = '未绑定'
      }
      return len
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getProfile()
      vm.checkIsAuth()
    })
  },
  created () {
    // this.getProfile()
  },
  methods: {
    checkIsAuth () {
      this.requestPost(Services.isAuth, {
      }, (remoteData) => {
        this.isAuth = remoteData.isAuth
        this.authStatus = remoteData.auth_status
      })
    },
    loginOut () {
      this.requestPost(Services.loginOut, {
      }, (remoteData) => {
        location.href = './home.html'
      })
    },
    getProfile () {
      this.requestPost(Services.myProfile, {
      }, (remoteData) => {
        this.profile = remoteData.data
        this.$router.app.data = remoteData.data
      })
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

  .profile{
    background-color: #ededed;
    min-height: 100vh;
    .name{
      font-size: 14px;
      font-weight: normal;
      margin-left: 15px;
      height: 5px;
      line-height: 30px;
      color: rgb(102,102,102);
    }
    .weui-cells{
      margin-top: 0;
      font-size: 13px;
      color: rgb(151,151,151);
      .icon-shenhezhong, .icon-iconfontyuanjiaojuxing1eps{
        color: rgb(238,71,67)
      }
      .icon-yirenzheng2{
        color: #4374e2
      }

    }
    .btn-wrap{
      margin: 10px 20px;

      .weui-btn_primary{
        background-color: #e1625f;
        font-size: 14px;
      }
      .weui-btn_primary:not(.weui-btn_disabled):active{
        background-color: #EE5055;
      }
    }
  }
</style>
