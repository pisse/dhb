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

      <div class="list-item" v-for="(prod, idx) in list" :key="idx" v-show="completeAuth && hasCustom">
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

      <div class="idt-wrap"  v-show="!completeAuth">
        <!--<masker :opacity="0.6">-->
        <div class="flow-wrap">
          <!--<span class="close" @click="close"><x-icon type="ios-close-outline" size="40"></x-icon></span>-->
          <flow orientation="vertical" style="height:100%;">
            <div class="header">
              请完成下面各项认证！
            </div>
            <flow-state state="1" title="实名认证" :is-done="idCardAuth" @click.native="goAuth(1)"></flow-state>
            <flow-line :is-done="idCardAuth"></flow-line>

            <flow-state state="2" title="手机号认证" :is-done="phoneAuth" @click.native="goAuth(2)"></flow-state>
            <flow-line tip="" :is-done="phoneAuth"></flow-line>

            <flow-state state="3" title="银行卡认证" :is-done="bankCardAuth" @click.native="goAuth(3)"></flow-state>
            <flow-line :tip="authing ? '认证中': ''" :is-done="completeAuth"></flow-line>

            <flow-state state="4" title="完成" :is-done="completeAuth"></flow-state>
          </flow>
        </div>
        <!--</masker>-->
      </div>
      <div class="no-custom" v-show="completeAuth && !hasCustom">
        <span class="tip">
           <x-icon type="ios-information-outline" size="30"></x-icon>
          您还没有定制放贷项目，<br>请联系运营人员为您定制。
        </span>
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

import { Loading, Masker, Flow, FlowState, FlowLine } from 'vux'
import vFooter from '../components/footbar'
import Services from '../common/js/services'
import _request from '../common/js/request'
import utils from '../common/js/utils'

export default {
  mixins: [_request],
  name: 'app',
  data () {
    return {
      completeAuth: true,
      idCardAuth: false,
      phoneAuth: false,
      bankCardAuth: false,
      authing: false,
      hasCustom: true,
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
    // this.getList()
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      this.requestPost(Services.authStatus, {}, (remoteData) => {
        this.idCardAuth = remoteData.idcard_status == 1
        this.phoneAuth = remoteData.phone_status == 1
        this.bankCardAuth = remoteData.bankcard_status == 1
        this.completeAuth = remoteData.realname_status == 1
        this.authing = remoteData.auth_status == 1
        this.hasCustom = remoteData.invest && remoteData.invest.length > 0
        this.list = remoteData.invest
        // 触发自主认证
        if (this.idCardAuth && this.phoneAuth && this.bankCardAuth && !this.authing) {
          this.authing = true
          this.requestPost(Services.autoAuth, {
          }, (remoteData) => {
          })
        }
      })
    },
    goAuth (type) {
      // card
      if (type == 1 && !this.idCardAuth) {
        location.href = './profile.html?rt=identity'
      }
      if (type == 2 && !this.phoneAuth) {
        location.href = './profile.html?rt=mobile'
      }
      if (type == 3 && !this.bankCardAuth) {
        location.href = './profile.html?rt=cardlist'
      }
    },
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
    vFooter, Loading, Masker, Flow, FlowState, FlowLine
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
    position: relative;
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
  .vux-x-icon {
    fill: #E2E2E2;
  }
  .idt-wrap {
    /*position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;*/
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    bottom: 0;
    background : #fff;
    .close {
      position: absolute;
      right: 0;
      margin-top: -40px;
    }
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s linear;
    }
    &.slide-enter, &.slide-leave-active {
      transform: translate3d(0, 100%, 0);
    }
    .flow-wrap {
      height: 100%;
      //padding: 40% 0;
      box-sizing: border-box;
      //width: 90%;
      margin: 0 auto;
    }
    .weui-wepay-flow {
      box-sizing: border-box;
      //background-color: #fff;
      //background-color: rgb(241, 241, 241);
      padding: 20px 0 50px 70px;
      border-radius: 5px;
    }
    .weui-wepay-flow__state {
      background-color: #4374e2;
    }
    .weui-wepay-flow__li_done .weui-wepay-flow__state {
      background-color: #e2e2e2;
    }
    .weui-wepay-flow_vertical .weui-wepay-flow__line {
      width: 1px;
      background-color: rgba(7, 17, 27, 0.5);
    }
    .weui-wepay-flow__li_done .weui-wepay-flow__title-right {
      color: #999999;
    }
    [class^="weui-wepay-flow__title-"], [class*=" weui-wepay-flow__title-"] {
      color: #333;
    }
    .weui-wepay-flow__li .weui-wepay-flow__state {
      color: #fff;
    }
    .weui-wepay-flow__info-left:after{
      border-color: transparent transparent transparent #4374e2;
    }
    .weui-wepay-flow__li.weui-wepay-flow__li_done .weui-wepay-flow__state {
      color: #999999;
    }
    [class^="weui-wepay-flow__info-"] {
      background-color: #4374e2;
    }
    .weui-wepay-flow__bd {
      align-items: left;
      .header {
        margin-bottom: 30px;
      }
      .weui-wepay-flow__li {
        width: 100%;
        &:last-child {
          .weui-wepay-flow__title-right {
            &:after, &:before {
              height: 0;
              border: 0;
            }
          }
        }
        .weui-wepay-flow__title-right {
          // width: 100%;
          width: 85%;
          height: 50px;
          box-sizing: border-box;
          line-height: 50px;
          &:before {
            content: '';
            position: absolute;
            top: 20px;
            width: 6px;
            height: 6px;
            border: 1px solid #999999;
            border-left: 0;
            border-bottom: 0;
            transform: rotate(45deg);
            right: 0px;
          }
          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            height: 1px;
            background-color: #E2E2E2;
            left: 0;
            right: 0;
            transform: scaleY(0.5)
          }
        }
      }
      .weui-wepay-flow__li .weui-wepay-flow__state {
        left: -7px;
      }
      .weui-wepay-flow__process {
        background-color: #e2e2e2;
        width: 1px;
      }
    }
    .vux-masker {
      z-index: -1;
    }
  }
  .no-custom{
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    bottom: 0;
    background : #fff;
    .vux-x-icon {
      position: absolute;
      left: 50%;
      top: -30px;
      fill: #4374e2;
      margin-left: -15px;
    }
    .tip{
      position: absolute;
      top: 50%;
      left: 10px;
      text-align: center;
      right:10px;
      line-height: 30px;
      size: 14px;
      margin-top: -30px;
    }
  }

</style>
