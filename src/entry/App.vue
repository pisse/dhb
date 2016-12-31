<template>
  <div id="app" class="">
    <!--<router-view></router-view>-->
    <div class="overview">
      <div class="title">我的总资产（元）<i @click.prevent="toggleShow" class="iconfont" :class="{'icon-yanjing': isShow,'icon-biyan': !isShow}"></i></div>
      <div class="total"><span v-if="isShow">{{total | toFixed(2)}}</span><span v-else>****</span></div>
      <div class="yestaday_earn">累计收益：<span v-if="isShow"> +{{totalEarn | toFixed(2)}}</span><span v-else>****</span></div>
    </div>
    <div class="prod-list">

      <div v-transfer-dom>
        <loading v-model="isLoading" text="加载中..."></loading>
      </div>

      <div class="list-item" v-for="(prod, idx) in list" :key="idx">
        <h3 class="name">{{prod.title}}</h3>
        <div class="detail">
          <span class="revenue">{{prod.rate}}%</span>
          <span class="time">{{prod.invest_date}}天</span>
        </div>
        <div class="money-start">
          起投金额{{parseInt(prod.each_min)/10000}}万元
        </div>
        <span class="invest-btn" @click="goDetail(prod.id, $event)">立即预约</span>
      </div>

    </div>
    <div class="infos-wrap">
      <div class="infos">
        <p class="item"><a
                href="./introduce.html"><span class="icon-bg"><i class="iconfont icon-ziyuan"></i></span><br> <span class="text">平台信息</span></a></p>
        <p class="item"><a
                href="./introduce.html#/creditor"><span class="icon-bg"><i class="iconfont icon-zhaiquanzhuanrang"></i></span><br><span class="text">债权介绍</span></a></p>
        <p class="item"><a
                href="./introduce.html#/creditor/safety"><span class="icon-bg"><i class="iconfont icon-anquan"></i></span><br><span class="text">还款保障</span></a></p>
      </div>
    </div>

    <v-footer type="index"></v-footer>
  </div>
</template>

<script>

import { Loading } from 'vux'
import vFooter from '../components/footbar'
import Services from '../common/js/services'
import _request from '../common/js/request'
import utils from '../common/js/utils'

export default {
  mixins: [_request],
  name: 'app',
  data () {
    return {
      isShow: true,
      asset: {},
      totalEarn: 0,
      list: []
    }
  },
  computed: {
    total () {
      let invest = parseInt(this.asset.invest) || 0
      let remaining = parseInt(this.asset.remaining) || 0
      // console.log(invest, remaining)
      return (parseInt(this.asset.invest) || 0) + (this.asset.remaining || 0)
    }
  },
  filters: {
    toFixed (num, precision) {
      // return parseFloat(num).toFixed(precision)
      return utils.formatNumber(num, precision)
    }
  },
  created () {
    this.getAsset()
    this.getTotalEarn()
    this.getList()
  },
  methods: {
    getAsset () {
      this.requestPost(Services.userAsset, {}, (remoteData) => {
        this.asset = remoteData.asset
      })
    },
    getTotalEarn () {
      this.requestPost(Services.totalEarn, {}, (remoteData) => {
        this.totalEarn = parseFloat(remoteData.asset)
      })
    },
    getList () {
      this.requestPost(Services.prodList, {}, (remoteData) => {
        this.list = remoteData.prod
      })
    },
    toggleShow () {
      this.isShow = !this.isShow
    },
    goDetail (id) {
      location.href = 'detail.html?' + 'id=' + id
    }
  },
  components: {
    vFooter, Loading
  }
}
</script>

<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background-color: #ededed;
    .iconfont{
      vertical-align: middle;
    }
  }
  .overview {
    flex: 0 0 123px;
    height: 123px;
    text-align: center;
    padding: 20px 0;
    color: #fff;
    background-color: #4374e2;
    box-shadow: 0 0 4px #4374e2;
    .title , .yestaday_earn{
      font-size: 12px;
      line-height: 20px;
    }
    .total{
      font-size: 32px;
      line-height: 30px;
      margin: 20px 0 10px 0;
    }
    .yestaday_earn{
      height: 20px;
      color: rgb(232,232,232);
      span{
        color: #fff;
      }
    }
    // color: #fff
  }
  .prod-list{
    flex: 1;
    margin: 10px;
    .list-item{
      background-color: #fff;
      text-align: center;
      padding: 10px 0;
      margin-bottom: 10px;
      line-height: 20px;
      .name {
        text-align: left;
        margin-left: 10px;
        font-size: 14px;
        font-weight: normal;
        color: rgb(151,151,151);
      }
      .detail{
        display: flex;
        margin-bottom: 12px;
        margin-top: 6px;
        font-size: 16px;
        .revenue{
          flex: 1;
          border-right: 1px solid rgb(230,230,230);
          color: rgb(238,71,67);
          font-weight: bold;
        }
        .time{
          flex: 1;
          color: rgb(51,51,51);
          a{
            display: inline-block;
          }
        }
      }
      .money-start{
        color: rgb(102,102,102);
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 6px;
      }
      .invest-btn{
        height: 20px;
        display: inline-block;
        line-height: 20px;
        background-color: #5d89eb;
        color: #fff;
        border-radius: 13px;
        padding: 3px 24px 3px 24px;
        font-size: 13px;
      }
    }
  }
  .infos-wrap{
    flex: 0 0 125px;
    height: 125px
  }
  .infos{
    display: flex;
    background-color: #fff;
    padding: 10px 30px;
    margin-bottom: 15px;
    .item{
      flex:1;
      text-align: center;
      font-size: 10px;
      color: rgb(51,51,51);

      .icon-bg{
        width: 30px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        background-color: #4374e2;
        border-radius: 15px;
        color: #fff;
        margin-bottom: 5px;
      }
      .text{
        color: rgb(102,102,102);
        font-size: 11px;
      }
    }
  }

</style>
