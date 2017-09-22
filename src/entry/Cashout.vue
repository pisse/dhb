<template>
  <div class="cashout bg">
    <x-header :left-options="{backText: ''}">提现</x-header>
    <group title="">
      <!--<cell title="真实姓名" :value="profile.idcard_name" ></cell>-->

      <cell :title="(selectedCard.bank_name || '')+'，尾号'+ last4(selectedCard.card_no)" link="/in/list" :inline-desc='backDesc'>
        <div slot="icon" class="back-icon">
          <i class="iconfont" :class="bankIcon"></i>
        </div>
      </cell>

      <!--<cell title="银行" :value="selectedCard.bank_name"  is-link link="/in/list"></cell>
      <cell title="卡号" :value="cartNo(selectedCard.card_no)" ></cell>-->

      <x-input title="提现金额" name="username" v-model="money" placeholder="受余额限制" type="number"></x-input>
    </group>

    <div class="btn-wrap follow" :class="{active: isActive}">
      <x-button type="primary" @click.native="buy">提交</x-button>
    </div>

    <div class="info">
      <x-icon type="ios-information-outline" size="10"></x-icon>
      提现申请提交时间为工作日9:00~17:00，如遇节假日顺延，提交申请后，我们将会为您2小时内审核，并在T+1内将您的提现金额汇至您的个人绑定银行账户中，请耐心等待。
    </div>

    <toast width="16em" v-model="showToast" type="text">{{msg}}</toast>

    <x-dialog v-model="showConfirm" class="dialog-success" hide-on-blur>
      <div class="info-box">
        {{confirmMsg }}
      </div>
      <div @click="onConfirm()" class="confirm-wrap">
        <span class="vux-close">确认</span>
      </div>
    </x-dialog>

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>


    <!--<x-dialog v-model="showPwd" class="dialog-pwd" hide-on-blur>
      <div>
        <span class="vux-close">支付密码</span>
      </div>
      <group>
        <x-input title="" :max="6" placeholder="请输入密码" type="password" v-model="pwd"></x-input>
      </group>
      <div class="btn-wrap follow" :class="{active: isPwdActive}">
        <x-button type="primary" @click.native="mention">确认</x-button>
      </div>
    </x-dialog>-->
    <transition name="fade" >
      <div class="password-wrap" v-show="showPwd">
        <div class="password-content">
          <h6 class="pwd-title"><span class="pwd-close" @click="close"><x-icon type="ios-close-empty"  size="30" ></x-icon></span>交易密码</h6>
          <div class="content">
            <p class="desc">提现</p>
            <div class="money">
              &yen; {{money}}
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

    <v-footer type="home"></v-footer>
  </div>
</template>
<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  .cashout{
    .weui-cells{
      font-size: 14px;
      color: rgb(102,102,102);
      .weui-cell:before{
        left: 0;
      }
      .back-icon{
        margin-right: 10px;
        .iconfont{
          font-size: 36px;
          color: #4374e2;
        }
      }
      .vux-label-desc{
        font-size: 12px;
        color: #999;
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
<script type="text/ecmascript-6">
  import vFooter from '../components/footbar'
  import { Loading, XHeader, XDialog, FlexboxItem, Flexbox, Tab, TabItem, Toast, Group, Cell, ButtonTab, XButton, ButtonTabItem, XInput } from 'vux'
  import Services from '../common/js/services'
  import _request from '../common/js/request'

  export default {
    mixins: [_request],
    name: 'cashout',
    data () {
      return {
        profile: {},
        money: 0,
        pwd: '',
        showPwd: false,
        showConfirm: false,
        confirmMsg: '',
        selectedCard: {},
        backList: {
          '工商银行': {icon: 'icon-gongshangyinhangicbcbank1193388easyiconnet', dayMax: '99', onceMax: '50'},
          '兴业银行': {icon: 'icon-xingye', dayMax: '3000', onceMax: '100'},
          '光大银行': {icon: 'icon-guangdayinxingyy', dayMax: '3000', onceMax: '100'},
          '平安银行': {icon: 'icon-pinganyinxing', dayMax: '99', onceMax: '50'},
          '民生银行': {icon: 'icon-305', dayMax: '3000', onceMax: '100'},
          '交通银行': {icon: 'icon-jiaotongyinhangbank1193391easyiconnet', dayMax: '50', onceMax: '50'},
          '广发银行': {icon: 'icon-guangfa', dayMax: '3000', onceMax: '100'},
          '招商银行': {icon: 'icon-zhaoshangyinhangbank1193432easyiconnet', dayMax: '3000', onceMax: '100'}

          // '农业银行': 'icon-nongyeyinhang',
          // '建设银行': 'icon-jiansheyinhangbank1193390easyiconnet',
          // '中国银行': 'icon-zhongguoyinhangbank1193437easyiconnet',
          // '光大银行': 'icon-guangdayinxingyy',
          // '浦发银行': 'icon-iconfontshanghaipudongfazhanyinxing',
          // '上海银行': 'icon-shanghaiyinxing'
        }
      }
    },
    computed: {
      isActive () {
        return !!this.money
      },
      isPwdActive () {
        return !!this.pwd
      },
      pwdLength () {
        return this.pwd.length
      },
      bankIcon () {
        let bankName = this.selectedCard.bank_name
        let icon = (this.backList[bankName] || {})['icon']
        return icon
      },
      backDesc () {
        let bankName = this.selectedCard.bank_name
        let backInfo = this.backList[bankName] || {}
        return '最高单笔' + (backInfo['onceMax'] || '') + '万，' + '单日' + (backInfo['dayMax'] || '') + '万'
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getProfile()
        // vm.profile = vm.$router.app.data || {}
        // vm.selectedCard = vm.profile.selectedCard || (vm.profile.bankcard && vm.profile.bankcard[0] || {})
        /* if (!vm.profile) {
          vm.profile = {}
          vm.getProfile()
        } */
      })
    },
    created () {
      // this.getProfile()
    },
    methods: {
      cartNo (number) {
        let numstr = number + ''
        if (number) {
          return '**** **** **** ' + numstr.substring(numstr.length - 4, numstr.length)
        } else {
          return ''
        }
      },
      last4 (number) {
        let numstr = (number || '') + ''
        return numstr.substring(numstr.length - 4, numstr.length)
      },
      getProfile () {
        this.requestPost(Services.myProfile, {
        }, (remoteData) => {
          this.profile = remoteData.data || {}
          this.$router.app.data = remoteData.data
          this.selectedCard = this.profile.selectedCard || (this.profile.bankcard && this.profile.bankcard[0] || {})
        })
      },
      buy () {
        if (this.money == 0) {
          this.showToast = true
          this.msg = '请输入提现金额'
          return
        }
        if (!this.selectedCard.card_no) {
          this.showToast = true
          this.msg = '请选择银行卡'
          return
        }
        if (!/^\d+(\.\d+)?$/.test(this.money)) {
          this.showToast = true
          this.msg = '提现金额不对'
          return
        }
        this.showPwd = true
        this.pwd = ''
      },
      mention () {
        /* if (!this.pwd) {
          this.showToast = true
          this.msg = '请输入支付密码'
          return
        } */
        let params = {
          money: this.money,
          bankcard: this.selectedCard.card_no,
          passwd: this.pwd
        }
        this.requestPost(Services.mention, params, (remoteData) => {
          // this.showPwd = false
          // this.showToast = true
          // this.msg = '您已提交提现申请，我们将为您尽快审核，并T+1内汇款至您绑定账户'

          this.showConfirm = true
          this.confirmMsg = '您已提交提现指令，T+1内汇入您的绑定银行账户。' // '您已提交提现申请，我们将为您尽快审核，并T+1内汇款至您绑定账户。'
          this.money = ''
        }).finally((e) => {
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
          this.mention()
        }
      },
      close () {
        this.showPwd = false
      },
      onConfirm () {
        this.showConfirm = false
        this.$router.go(-1)
      }
    },
    components: {
      Loading,
      Toast,
      XDialog,
      vFooter,
      Tab,
      TabItem,
      Group,
      Cell,
      ButtonTab,
      ButtonTabItem,
      XInput,
      XButton,
      XHeader,
      Flexbox,
      FlexboxItem
    }
  }
</script>
