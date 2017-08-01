<template>
  <div class="addmobile bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">绑定手机号</x-header>


    <group>
      <x-input title='' placeholder="请输入手机号" type="number" v-model="mobile"></x-input>
      <x-input title='' placeholder="请输入验证码" :max="6" type="number" v-model="code">
        <x-button v-if="!iscaptchaing" slot="right" type="primary" mini @click.native="getVcode">发送验证码</x-button>
        <countdown v-else slot="right" v-model="counter" :start="iscaptchaing" @on-finish="finish"></countdown>
      </x-input>
    </group>

    <div class="btn-wrap follow" :class="{active: isActive}">
      <x-button type="primary" @click.native="bind">立即绑定</x-button>
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

  .addmobile{
    .vux-tab .vux-tab-item.vux-tab-selected{
      color: #5d89eb;
      border-bottom-color: #5d89eb;
    }
    .vux-tab-ink-bar{
      background-color: #5d89eb;
    }
    .weui-cells{
      .weui-btn_primary{
        width: 100px;
        background-color: #5d89eb;
      }
    }

    .weui-input{
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
  import { Loading, XHeader, Countdown, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem } from 'vux'

  import Services from '../../common/js/services'
  import _request from '../../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        name: '',
        idcard: '',
        mobile: '',
        code: '',
        iscaptchaing: false,
        counter: 60
      }
    },
    computed: {
      isActive () {
        return this.mobile && (/^1[3|4|5|8][0-9]\d{8}$/.test(this.mobile))
      }
    },
    methods: {
      getVcode () {
        if (!this.isActive) {
          this.showToast = true
          this.msg = '请输入正确手机号'
          return
        }
        this.iscaptchaing = true
        this.requestPost(Services.getVcode, {
          mobile: this.mobile
        }, () => {
          this.showToast = true
          this.msg = '验证码已发送'
        })
      },
      finish () {
        this.iscaptchaing = false
        this.counter = 60
      },
      bind () {
        if (!this.isActive) {
          this.showToast = true
          this.msg = '请输入正确手机号'
          return
        }
        if (this.code === '') {
          this.showToast = true
          this.msg = '请输入验证码'
          return
        }
        this.requestPost(Services.bindMobile, {
          vcode: this.code,
          mobile: this.mobile
        }, (remoteData) => {
          this.showToast = true
          this.msg = '绑定成功'

          this.code = ''
          this.mobile = ''

          setTimeout(() => {
            this.reset()
            this.$router.go(-1)
          }, 1000)
        })
      },
      reset () {
        this.mobile = ''
      },
      change () {}
    },
    components: {
      XHeader, Step, StepItem, Countdown, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading
    }
  }
</script>
