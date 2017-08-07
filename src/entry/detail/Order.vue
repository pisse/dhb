<template>
  <div id="app" class="detail-order bg">
    <!--<router-view></router-view>-->
    <x-header :left-options="{backText: ''}">预约</x-header>

    <div class="order-content">
      <h1 class="title">{{detail.title}}</h1>

      <div class="prod-info">
        <flexbox :gutter="0">
          <flexbox-item><span class="flex-demo">预期年化：{{detail.rate}}.00%</span></flexbox-item>
          <flexbox-item><span class="flex-demo">理财期限：{{detail.invest_date}}天</span></flexbox-item>
        </flexbox>
        <flexbox :gutter="0">
          <flexbox-item><span class="flex-demo">还款类型：{{detail.return_type}}</span></flexbox-item>
          <flexbox-item><!--<span class="flex-demo">剩余金额：{{detail.remain_amount|toFixed(2)}}</span>--></flexbox-item>

        </flexbox>
      </div>
    </div>

    <group title="">
      <x-input title='金额' type="number" :placeholder="placeholder"  v-model="buyAmount"></x-input>
    </group>

    <div class="invest-contract">
      <check-icon :class="{'shake-animation':autoAgreement}" :value="autoAgreement" type="plain"></check-icon>
      <p class="agree-tip">我已阅读并确认 <span class="service-contract" @click="serviceDetail">《投资服务协议》</span>，可承受该产品投资风险，其资产策略与我的投资策略一致</p>
  </div>

    <div class="btn-wrap follow" :class="{active: isActive}">
      <x-button type="primary" @click.native="buy">提交</x-button>
    </div>

    <toast v-model="showToast" type="text">{{msg}}</toast>

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>

    <x-dialog v-model="showConfirm" class="dialog-success" hide-on-blur>
      <div class="info-box">
        {{confirmMsg }}
      </div>
      <div @click="onConfirm()" class="confirm-wrap">
        <span class="vux-close">确认</span>
      </div>
    </x-dialog>

    <div v-transfer-dom>
      <confirm v-model="showConfirmDialog"
               title="预购成功"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               confirm-text="前往"
               cancel-text="取消"
              >
        <p style="text-align:center;">{{ confirmMsg }}</p>
      </confirm>
    </div>


    <!--<x-dialog v-model="showPwd" class="dialog-pwd" hide-on-blur>
      <div>
        <span class="vux-close">支付密码</span>
      </div>
      <group>
        <x-input :max="6" title="" placeholder="请输入密码" type="password" v-model="pwd"></x-input>
      </group>
      <div class="btn-wrap follow" :class="{active: isPwdActive}">
        <x-button type="primary" @click.native="pay">确认</x-button>
      </div>
    </x-dialog>-->
    <transition name="fade" >
      <div class="password-wrap" v-show="showPwd">
        <div class="password-content">
          <h6 class="pwd-title"><span class="pwd-close" @click="close"><x-icon type="ios-close-empty"  size="30" ></x-icon></span>交易密码</h6>
          <div class="content">
            <p class="desc">预约</p>
            <div class="money">
              &yen; {{buyAmount}}
            </div>

            <flexbox :gutter="0">
              <flexbox-item v-for="n in pwdLength" :key="n"><div class="flex-item-pwd isWrited">&nbsp;<span class="circle"></span></div></flexbox-item>
              <flexbox-item v-for="m in (6-pwdLength)" :key="'empyt'+m"><div class="flex-item-pwd">&nbsp;</div></flexbox-item>
            </flexbox>
          </div>
        </div>
        <transition name="slide">
          <div class="keyboard" v-show="showPwd">
            <flexbox :gutter="0">
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('1')">1</div></flexbox-item>
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('2')">2</div></flexbox-item>
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('3')">3</div></flexbox-item>
            </flexbox>
            <flexbox :gutter="0">
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('4')">4</div></flexbox-item>
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('5')">5</div></flexbox-item>
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('6')">6</div></flexbox-item>
            </flexbox>
            <flexbox :gutter="0">
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('7')">7</div></flexbox-item>
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('8')">8</div></flexbox-item>
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('9')">9</div></flexbox-item>
            </flexbox>
            <flexbox :gutter="0">
              <flexbox-item class="empty"><div class="flex-item-keyborad"></div></flexbox-item>
              <flexbox-item><div class="flex-item-keyborad" @click="pwdIpt('0')">0</div></flexbox-item>
              <flexbox-item class="delete"><div class="flex-item-keyborad" @click="pwdIpt('-1')"><i class="iconfont icon-delete"></i></div></flexbox-item>
            </flexbox>
          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script >
import { XHeader, CheckIcon, Confirm, XDialog, Tab, Loading, Toast, TabItem, Flexbox, FlexboxItem, Group, XInput, Cell, ButtonTab, ButtonTabItem, XTextarea, XButton, Card, TransferDomDirective as TransferDom } from 'vux'
import Services from '../../common/js/services'
import _request from '../../common/js/request'
import utils from '../../common/js/utils'

export default {
  mixins: [_request],
  name: 'app',
  data () {
    return {
      detail: {},
      buyAmount: 0,
      showPwd: false,
      autoAgreement: false,
      payType: 'balance',
      pwd: '',

      showConfirmDialog: false,

      showConfirm: false,
      confirmMsg: ''
    }
  },
  filters: {
    toFixed (num, precision) {
      return parseFloat(num).toFixed(precision)
    }
  },
  directives: {
    TransferDom
  },
  computed: {
    isActive () {
      return !!this.buyAmount
    },
    isPwdActive () {
      return !!this.pwd
    },
    pwdLength () {
      return this.pwd.length
    },
    placeholder () {
      let each_min = ''
      if (this.detail.each_min) {
        each_min = this.detail.each_min / 10000
        return `${each_min}万起投 ${each_min}万递增`
      }
      return each_min
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.detail = vm.$router.app.data
      if (!vm.detail) {
        vm.detail = {}
        vm.getDetail()
      }
    })
  },
  created () {
  },
  methods: {
    serviceDetail () {
      this.$router.push({path: 'protocal'})
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
      if (!this.autoAgreement) {
        this.autoAgreement = true
      }
      if (!/^\d{3,10}$/.test(this.buyAmount)) {
        this.showToast = true
        this.msg = '购买金额不对'
        return
      }
      let each_min = this.detail.each_min
      if (this.buyAmount % each_min > 0) {
        this.showToast = true
        this.msg = this.placeholder
        return
      }
      this.showPwd = true
      this.pwd = ''
    },
    pay () {
      /* if (!this.pwd) {
        this.showToast = true
        this.msg = '请输入支付密码'
        return
      } */

      let params = {
        investment_sum: this.buyAmount,
        pay_style: this.payType,
        invest_id: this.detail.id,
        pay_passwd: this.pwd
      }

      this.requestPost(Services.order, params, (remoteData) => {
        // this.showToast = true
        // this.msg = '预约成功'
        this.buyAmount = ''
        this.pay_passwd = ''

        // this.showConfirm = true
        // this.confirmMsg = '预约成功，您可以在“我的”—“理财项目”里查看项目详情”。'
        this.showConfirmDialog = true
        this.confirmMsg = '是否立即前往查看预购项目？'
      }).finally((e) => {
        // console.log(e)
        this.showPwd = false
      })
    },
    pwdIpt (num) {
      if (num === '-1') {
        this.pwd = this.pwd.slice(0, this.pwd.length - 1)
      } else {
        this.pwd += num
      }
      // console.log(this.pwd)
      if (this.pwd.length == 6) {
        this.showPwd = false
        this.pay()
      }
    },
    close () {
      this.showPwd = false
    },
    onConfirm () {
      this.showConfirmDialog = false
      location.href = 'manage.html'
      // this.showConfirm = false
      // this.$router.go(-1)
    },
    onCancel () {
      console.log('on cancel')
    }
  },
  components: {
    CheckIcon,
    Confirm,
    XDialog,
    Toast,
    XInput,
    Tab,
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
  @import '~vux/src/styles/reset.less';
  @import '../../assets/less/base.less';

  @keyframes cart_shake{
    0% {transform:scale(1)}
    10% {transform:scale(1.5)}
    50% {transform:scale(.8)}
    100% {transform:scale(1)}
  }

  .detail-order{
    .order-content{
      padding: 10px;
    }
    .prod-info{
      color: rgb(151,151,151);
      font-size: 12px;
    }
    .title{
      font-size: 16px;
      font-weight: normal;
      color: rgb(51,51,51);
      margin-bottom: 15px;
    }
    .weui-label{
      color: rgb(51,51,51);
      font-size: 15px;
    }
    .weui-input{
      font-size: 13px;
    }
    .invest-contract{
      margin: 30px 10px 0 10px;
      margin-top: 30px;
      font-size: 12px;
      .vux-check-icon{
        float: left;
        &.shake-animation{
          animation-fill-mode: both;
          animation-iteration-count: 1;
          animation: cart_shake .8s 0s ease-in-out;
        }
        .weui-icon-circle{
          font-size: 16px;
          vertical-align: text-top;
        }
        .weui-icon-success-circle{
          color: #4374e2;
          vertical-align: text-top;
          font-size: 16px;
          &:before{
            color: #4374e2;
          }
        }
      }
      .agree-tip{
        margin-left: 22px;
      }
      .service-contract{
        color: #4374e2;
      }
    }
    .dialog-success{
      .weui-dialog{
        padding: 10px;
        .info-box{
          padding : 5px 10px 10px 10px;
          border-bottom: 1px solid rgb(242,242,242);
        }
        .confirm-wrap{
          margin-top: 5px;
          color: #4374e2;
        }
      }
    }
  }

</style>
