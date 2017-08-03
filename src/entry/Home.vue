<template>
  <div id="app" class="home">
    <!--<router-view></router-view>-->
    <div class="overview">
      <div class="profile">
        <p class="logo-wrap"><i class="iconfont icon-dian"></i><span class="logo" :style="{backgroundImage: 'url(' + profile.headimgurl + ')'}"></span></p>
        <p class="account-name" v-if="profile.nickname">{{profile.nickname}}</p>
        <p class="account-name" v-else> 未登录<!--<a href="./login.html">请登录</a>--></p>
        <span>我的</span>
      </div>

      <div class="asset-wrap">
        <div class="total">
          <p class="total-asset">{{total| toFixed(2)}}</p>
          拥有资产（元）
        </div>
        <div class="rest">
            <p class="rest-asset">{{asset.remaining || 0 | toFixed(2)}}</p>
          账户余额（元）
        </div>
      </div>

      <div class="operation">
        <span class="cash-out" @click.prevent="goCashOut">提现</span>
        <span class="cash-in" @click.prevent="goRecharge">充值</span>
      </div>

    </div>

    <group class="group-wrap" label-width="4.5em" label-margin-right="2em" label-align="right">
      <cell title="我的项目" value="" is-link  @click.native="goManage" >
        <div slot="icon">
          <i class="iconfont icon-touzi"></i>
        </div>
      </cell>
      <cell title="交易明细" value="" is-link value-align="left" @click.native="goHistory">
        <div slot="icon">
          <i class="iconfont icon-jiaoyimingxiicon"></i>
        </div>
      </cell>
      <cell title="我的账户" value="" is-link value-align="left" @click.native="goProfile">
        <div slot="icon">
          <i class="iconfont icon-zhanghaoicon"></i>
        </div>
      </cell>
     <!-- <cell title="联系我们" value="" is-link value-align="left">
        <div slot="icon">
          <i class="iconfont icon-lianxiwomen"></i>
        </div>
      </cell>-->
    </group>

    <v-footer type="home"></v-footer>
  </div>
</template>

<script>
import vFooter from '../components/footbar'
import { Tab, TabItem, Group, Cell, ButtonTab, ButtonTabItem, Icon } from 'vux'
import Services from '../common/js/services'
import _request from '../common/js/request'
import utils from '../common/js/utils'

export default {
  mixins: [_request],
  name: 'home',
  data () {
    return {
      isShow: true,
      list4: ['提现', '充值'],
      asset: {},
      profile: {}
    }
  },
  /* beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getProfile()
    })
  }, */
  computed: {
    userName () {
      console.log(document.cookie)
      return utils.getCookie('user_name')
    },
    total () {
      return (parseInt(this.asset.invest) || 0)
    }
  },
  filters: {
    toFixed (num, precision) {
      return utils.formatNumber(num, precision)
    }
  },
  created () {
    this.getAsset()
    this.getProfile()
  },
  methods: {
    goCashOut () {
      this.$router.push({path: 'out'})
    },
    goRecharge () {
      this.$router.push({path: 'in'})
    },
    goManage () {
      location.href = './manage.html'
    },
    goHistory () {
      location.href = './ordhistory.html'
    },
    goProfile () {
      location.href = './profile.html'
    },
    getProfile () {
      this.requestPost(Services.myProfile, {
      }, (remoteData) => {
        this.profile = remoteData.data
        this.$router.app.data = remoteData.data
      })
    },
    getAsset () {
      this.requestPost(Services.userAsset, {}, (remoteData) => {
        this.asset = remoteData.asset
      })
    },
    toggleShow () {
      this.isShow = !this.isShow
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
    Icon
  }
}
</script>

<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  .home{
    height: 100vh;
    background-color: #ededed;
    .overview{
      background-color:#5d89eb;
      color: #fff;
    }
    .tab-wrap{
      margin: 15px 10px 0 10px;
    }
    .profile{
      position: relative;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #fff;
      padding-top: 5px;
      .account-name{
        display: inline-block;
        position: absolute;
        left: 50px;
        font-size: 13px;
        a{
          color: #fff;
        }
      }
      .logo-wrap{
        width: 32px;
        height: 32px;
        display: inline-block;
        border-radius: 16px;
        background-color: #fff;
        position: absolute;
        left: 10px;
        border: 1px solid #fff;
        .iconfont{
          margin-left: -40px;
        }
        .logo{
          position: absolute;
          left: 1px;
          top: 1px;
          display: inline-block;
          width: 30px;
          height: 30px;
          //background: url('http://avatar.csdn.net/4/0/8/1_isaisai.jpg') no-repeat center;
          background-size: 100%;
          border-radius: 15px;
        }
      }
      .name{
        font-size: 15px;
        height: 20px;
        line-height: 20px;
        border-bottom: 1px solid rgb(230,230,230);
      }
    }
    .asset-wrap{
      text-align: center;
      margin-top: 20px;
      padding-bottom: 20px;
      display: flex;
      .total-asset, .rest-asset{
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 2px;
        color: #fff;
      }
      .total{
        flex: 0 0 50%;
        font-size: 13px;
        color: rgb(242,242,242)
      }
      .rest{
        flex: 1;
        font-size: 13px;

        color: rgb(242,242,242)
      }
    }
    .operation{
      background-color: rgba(255,255,255,0.2);
      display: flex;
      text-align: center;
      font-size: 15px;
      line-height: 15px;
      span{
        padding: 10px;
        flex: 1;
        display: inline-block;
        box-sizing: border-box;
        &.cash-out{
          border-right: 1px solid rgba(255,255,255,0.5);
        }
      }
    }
    .group-wrap{
      .weui-cells{
        font-size: 14px;
        color: rgb(102,102,102);
      }
      .iconfont{
        color: #4374e2;
      }
    }
    .weui-cell:before{
      left: 0;
    }
  }

</style>
