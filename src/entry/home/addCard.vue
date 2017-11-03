<template>
  <div class="addcard bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">添加银行卡</x-header>


    <group>
      <popup-picker title="请选择" :data="cards" v-model="bankname" value-text-align="left"></popup-picker>
      <x-input title='' placeholder="请输入持卡人姓名" type="text" v-model="name"></x-input>
      <x-input title='' placeholder="请输入银行卡号" type="number" v-model="idcard"></x-input>
    </group>

    <div class="invest-contract">
      <check-icon :class="{'shake-animation':autoAgreement}" :value="autoAgreement" type="plain"></check-icon>
      <p class="agree-tip">我已阅读并确认 <span class="service-contract" @click="serviceDetail">《授权委托书》</span>。</p>
    </div>

    <div class="btn-wrap follow" :class="{active: isActive}">
      <x-button type="primary" @click.native="bindCard">立即绑定</x-button>
    </div>

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>

    <toast width="12em" v-model="showToast" type="text">{{msg}}</toast>

  </div>
</template>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '../../assets/less/base.less';

  @keyframes cart_shake{
    0% {transform:scale(1)}
    10% {transform:scale(1.5)}
    50% {transform:scale(.8)}
    100% {transform:scale(1)}
  }

  .addcard{
    .vux-tab .vux-tab-item.vux-tab-selected{
      color: #5d89eb;
      border-bottom-color: #5d89eb;
    }
    .vux-tab-ink-bar{
      background-color: #5d89eb;
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

    .weui-input, .weui-cell_access{
      font-size: 13px;
    }
    .account-other{
      font-size: 12px;
      margin: 10px;
      color: #5d89eb;
      .register a{
        color: #5d89eb;
      }
      .forget{
        float: right;
      }
    }

  }

</style>
<script type="text/ecmascript-6">
  import { Loading, CheckIcon, XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, PopupPicker } from 'vux'

  import Services from '../../common/js/services'
  import _request from '../../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        name: '',
        idcard: '',
        autoAgreement: false,
        cards: [
          [
            '农业银行（限额单日/笔：20万/20万）',
            '民生银行（限额单日/笔：60万/20万）',
            '中国银行（限额单日/笔：20万/5万）',
            '交通银行（限额单日/笔：20万/20万）',
            '广发银行（限额单日/笔：50万/50万）',
            '建设银行（限额单日/笔：50万/5万）'

            // '工商银行（限额单日/笔：99万/50万）',
            // '兴业银行（限额单日/笔：3000万/100万）',
            // '光大银行（限额单日/笔：3000万/100万）',
            // '平安银行（限额单日/笔：99万/50万）',
            // '广发银行（限额单日/笔：3000万/100万）',
            // '招商银行（限额单日/笔：3000万/100万）'
          ]
        ],
        bankname: ['民生银行（限额单日/笔：60万/20万）']
      }
    },
    computed: {
      isActive () {
        return this.name && this.idcard
      }
    },
    methods: {
      serviceDetail () {
        this.$router.push({path: '/cardlist/add/protocal', query: { name: this.name, idcard: this.idcard, bankname: this.bankname[0].slice(0, 4) }})
      },
      bindCard () {
        if (!this.autoAgreement) {
          this.autoAgreement = true
        }
        if (this.name === '') {
          this.showToast = true
          this.msg = '账户名不能为空'
          return
        }
        if (this.idcard === '') {
          this.showToast = true
          this.msg = '卡号不能为空'
          return
        }
        if (!/^\d{10,20}$/.test(this.idcard)) {
          this.showToast = true
          this.msg = '卡号格式不对'
          return
        }
        this.requestPost(Services.bindBankCard, {
          id_name: this.name,
          card_no: this.idcard,
          bank_name: this.bankname[0].slice(0, 4)
        }, (remoteData) => {
          this.name = ''
          this.idcard = ''
          this.$router.go(-1)
        })
      },
      change () {}
    },
    components: {
      XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading, PopupPicker, CheckIcon
    }
  }
</script>
