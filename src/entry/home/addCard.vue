<template>
  <div class="addcard bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">添加银行卡</x-header>


    <group>
      <popup-picker title="请选择" :data="cards" v-model="bankname" value-text-align="left"></popup-picker>
      <x-input title='' placeholder="请输入持卡人姓名" type="text" v-model="name"></x-input>
      <x-input title='' placeholder="请输入银行卡号" type="number" v-model="idcard"></x-input>
    </group>

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

  .addcard{
    .vux-tab .vux-tab-item.vux-tab-selected{
      color: #5d89eb;
      border-bottom-color: #5d89eb;
    }
    .vux-tab-ink-bar{
      background-color: #5d89eb;
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
  import { Loading, XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, PopupPicker } from 'vux'

  import Services from '../../common/js/services'
  import _request from '../../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        name: '',
        idcard: '',
        cards: [
          [
            '农业银行（限额单日/笔：20万/20万）',
            '民生银行（限额单日/笔：60万/20万）',
            '中国银行（限额单日/笔：20万/5万）',
            '交通银行（限额单日/笔：20万/20万）',
            '广发银行（限额单日/笔：50万/50万）'

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
      onItemClick () {},
      $t (t) {
        return t
      },
      bindCard () {
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
      XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading, PopupPicker
    }
  }
</script>
