<template>
  <div id="app" class="detail">
    <!--<router-view></router-view>-->
    <x-header :left-options="{backText: ''}">{{detail.title}}</x-header>
    <div class="overview">
      <div class="desc">预期年化</div>
      <div class="earning">{{detail.rate | toFixed(2)}} <span class="baifen">%</span></div>
    </div>

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>

    <div class="content-wrap">
      <flexbox class="revest-content" align="center">
        <flexbox-item><span class="revenue">{{detail.return_type}}</span></flexbox-item>
        <flexbox-item><span class="time">{{detail.invest_date}}天</span></flexbox-item>
        <!--<flexbox-item><span class="desc">{{detail.remain_amount | toFixed(2)}}</span></flexbox-item>-->
      </flexbox>
      <flexbox class="revest-desc" >
        <flexbox-item><span class="num"> 还款方式</span></flexbox-item>
        <flexbox-item><span class="">投资期限</span></flexbox-item>
        <!--<flexbox-item class="percent-wrap"><span class="desc">剩余余额（元）</span> </flexbox-item>-->
      </flexbox>
    </div>

    <group class="detail-wrap" label-width="4.5em" label-margin-right="2em" label-align="right">
      <cell class="order-detail" title="交易说明" value="" is-link value-align="left"  link="/protocal">
       <!-- <div slot="icon">
          <i class="iconfont icon-jiaoyimingxiicon"></i>
        </div>-->
      </cell>
      <cell title="起投金额" :value="moneyStart" value-align="right" ></cell>
    <!--  <cell title="融资金额" :value="detail.amount | toFixed(2)"  value-align="right"></cell>-->
      <cell title="计息方式" value="预约后次日计息"  value-align="right"></cell>
      <cell title="项目详情" value=""  value-align="right">
        <p slot="child" class="card-padding">{{detail.introduce}}</p>
      </cell>
      <!--<card :header="{title:'项目详情'}" :footer="{title:'查看更多',link:'/component/panel'}">
        <p slot="content" class="card-padding">本项目原始债券主要为通过平台合作机构推荐的借款项目，注重流动性及安全性，其中包含一定比例的小额现金信贷。</p>
      </card>-->
      <cell v-if="false" title="购买情况" :value="(detail.buy_times||0) + '人'" value-align="right"></cell>
      <!--<cell title="购买情况" :value="(detail.buy_amount||0) + '人'" value-align="right" is-link :link="'./records.html?id=' + detail.id"></cell>-->
    </group>

    <div class="btn-wrap" :class="{active: isAuth}">
      <x-button type="primary" @click.native="buy" >立即预约</x-button>
    </div>

    <x-dialog v-model="showConfirm" class="dialog-success" hide-on-blur>
      <div class="info-box">
        {{confirmMsg }}
      </div>
      <div @click="onWaitingConfirm()" class="confirm-wrap">
        <span class="vux-close">确认</span>
      </div>
    </x-dialog>


    <div v-transfer-dom>
      <confirm v-model="showConfirmDialog"
               title="预购失败"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               confirm-text="前往"
               cancel-text="取消"
      >
        <p style="text-align:center;">{{ confirmMsg }}</p>
      </confirm>
    </div>

  </div>
</template>

<script>
import { XHeader, Confirm, XDialog, Tab, Loading, TabItem, Flexbox, FlexboxItem, Group, Cell, ButtonTab, ButtonTabItem, XTextarea, XButton, Card, TransferDomDirective as TransferDom } from 'vux'
import Services from '../../common/js/services'
import _request from '../../common/js/request'
import utils from '../../common/js/utils'

export default {
  mixins: [_request],
  name: 'app',
  data () {
    return {
      isShow: true,
      isAuth: false,
      authStatus: 0, // 0未认证，1认证中 10认证成功
      detail: {},

      showConfirmDialog: false,
      showConfirm: false,
      confirmMsg: ''
    }
  },
  computed: {
    moneyStart () {
      let each_min = ''
      if (this.detail.each_min) {
        each_min = this.detail.each_min / 10000
        return `${each_min}万元`
      }
      return each_min
    }
  },
  filters: {
    toFixed (num, precision) {
      // return parseFloat(num).toFixed(precision)
      return utils.formatNumber(num, 2)
    }
  },
  created () {
    this.getDetail()
    this.checkIsAuth()
  },
  methods: {
    checkIsAuth () {
      this.requestPost(Services.isAuth, {
      }, (remoteData) => {
        this.isAuth = remoteData.isAuth
        this.authStatus = remoteData.auth_status
      })
    },
    getDetail () {
      var id = utils.getParams('', 'id')
      this.requestPost(Services.prodDetail, {
        id: id
      }, (remoteData) => {
        this.detail = remoteData.detail
        this.$router.app.data = remoteData.detail
      })
    },
    buy () {
      if (this.authStatus == 0) {
        // this.showConfirm = true
        this.showConfirmDialog = true
        this.confirmMsg = '未认证用户暂不能预约，是否立即前往认证？'
      } else if (this.authStatus == 1) {
        this.showConfirm = true
        this.confirmMsg = '实名认证审核中，请等待审核通过。'
      } else {
        this.$router.push({path: 'order'})
      }
    },
    onWaitingConfirm () {
      this.showConfirm = false
    },
    onConfirm () {
      this.showConfirmDialog = false
      location.href = 'profile.html#/identity'
      // this.showConfirm = false
    },
    onCancel () {}
  },
  components: {
    Confirm,
    Tab,
    XDialog,
    TabItem,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    ButtonTab,
    ButtonTabItem,
    XTextarea,
    XButton,
    Card,
    XHeader,
    Loading
  }
}
</script>

<style lang="less">
  @import '../../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../../assets/less/base.less';

  .detail{
    .vux-header{
      background-color:#4374e2;
      .vux-header-title, .vux-header h1{
        font-size: 15px;
      }
    }
    height: 100vh;
    background-color: #ededed;
    .overview{
      background-color:#4374e2;
      color: #fff;
      text-align: center;
      .desc{
        font-size: 12px;
      }
      .baifen{
        font-size: 14px;
      }
      .earning{
        padding: 10px 0;
        font-size: 30px;
      }
    }
    .content-wrap{
      padding: 10px;
      background-color: #fff;

      .revest-content{
        font-size: 14px;
        padding: 10px 0 5px 0;
        text-align: center;
        color: rgb(51,51,51);
        // border-bottom: 1px solid rgb(230,230,230);
      }
      .revest-desc{
        font-size: 12px;
        text-align: center;
        color: rgb(151,151,151);
      }
    }
    .detail-wrap{
      .order-detail{
        font-size: 15px;
        .iconfont{
          color:#4374e2;
        }
      }
      .weui-cells{
        font-size: 13px;
        color: rgb(102,102,102);
        .weui-cell:before{
          left: 0;
        }
      }
    }

  }

</style>
