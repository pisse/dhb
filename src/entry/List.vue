<template>
  <div id="app" class="list bg">
    <!--<router-view></router-view>-->
    <!--<div style="height:44px;">
      <sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="false">
        <tab :line-width="1" active-color="rgb(67,112,230)" defaultColor="rgb(151,151,151)">
          <tab-item selected>全部</tab-item>
          <tab-item>1个月</tab-item>
          <tab-item>1-6个月</tab-item>
          <tab-item>6个月以上</tab-item>
        </tab>
      </sticky>
    </div>-->
   <!-- <div class="header">
      <span class="head-item">全部</span>
    </div>-->
    <x-header :left-options="{backText: '', showBack: false}">全部产品</x-header>

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>

    <div id="vux_view_box_body" class="list-wrap">
      <div v-for="(prod, idx) in list" :key="idx" class="list-item" @click="goDetail(prod.id, $event)">
        <h3 class="name">{{prod.title}}</h3>
        <flexbox class="content" >
          <flexbox-item><span class="revenue">{{prod.rate}}%</span></flexbox-item>
          <flexbox-item><span class="time">{{prod.invest_date}}天</span></flexbox-item>
          <flexbox-item><span class="desc">{{prod.return_type}}</span></flexbox-item>
        </flexbox>
        <flexbox class="revest-content">
          <flexbox-item><span class="num" v-show="parseInt(prod.buy_times)>=10"> {{prod.buy_times}}人已投</span></flexbox-item>
          <flexbox-item><span class=""></span></flexbox-item>
          <flexbox-item class="percent-wrap"><!--<span class="desc">{{getRage(prod)}}%</span> <x-progress :percent="percent" :show-cancel="false"></x-progress>--></flexbox-item>
        </flexbox>
      </div>
    </div>
    <v-footer type="list"></v-footer>
  </div>
</template>

<script>
import { XHeader, Loading, Tab, TabItem, Sticky, Flexbox, FlexboxItem, XProgress } from 'vux'
import vFooter from '../components/footbar'
import Services from '../common/js/services'
import _request from '../common/js/request'

export default {
  mixins: [_request],
  name: 'app',
  data () {
    return {
      percent: 80,
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.requestPost(Services.prodList, {}, (remoteData) => {
        this.list = remoteData.prod
      })
    },
    getRage (prod) {
      let buyAmount = prod.buy_amount
      let rate = buyAmount && (buyAmount['20'] || 0) / prod.amount
      rate = (rate * 100).toFixed(2)
      return rate
    },
    goDetail (id) {
      location.href = 'detail.html?id=' + id
    }
  },
  components: {
    XHeader,
    Loading,
    vFooter,
    Tab,
    TabItem,
    Sticky,
    Flexbox,
    FlexboxItem,
    XProgress
  }
}
</script>

<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  .list{
    .header{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 45px;
      line-height: 45px;
      background-color: #fff;
      padding: 0 15px;
      border-bottom: 1px solid rgb(232,232,232);
      color: rgb(51,51,51);
      .head-item{
        font-size: 18px;
        color: #4374e2;
      }
    }
    .list-wrap{
      background-color: #ededed;
      padding-bottom: 45px;
      padding-top: 5px;
    }
    .list-item{
      padding: 10px;
      text-align: center;
      margin-bottom: 10px;
      background-color: #fff;
      .content{
        text-align: center;
        padding: 15px 0;
        border-bottom: 1px solid rgb(230,230,230);
        font-size: 15px;
      }
      .revest-content{
        text-align: center;
        font-size:12px;
        margin-top: 5px;
        color: rgb(151,151,151);
        .percent-wrap{
          text-align: center;
          .weui-progress__inner-bar{
            background-color: #4374e2;
          }
        }
      }
      .name{
        text-align: left;
        font-size: 14px;
        font-weight: normal;
        color: rgb(151,151,151);
      }
      .revenue{
        color: rgb(238,71,67);
        font-size: 18px;
      }
      .desc{
        color: rgb(81,81,81)
      }
    }
  }

</style>
