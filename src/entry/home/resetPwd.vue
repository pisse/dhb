<template>
  <div class="reset-pwd bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">重置密码</x-header>


    <group>
      <cell :title="profile.phone" value="" >
        <div slot="icon" class="label-wrap">
          <i class="iconfont icon-mobile"></i>
        </div>
      </cell>

      <x-input title='' placeholder="请输入身份证号" type="number" v-model="cardNo" >
        <div slot="label" class="label-wrap">
          <i class="iconfont icon-credentials_icon"></i>
        </div>
      </x-input>

      <x-input title='' placeholder="请输入新密码" :max="6" type="password" v-model="newPwd">
        <div slot="label" class="label-wrap">
          <i class="iconfont icon-Secret"></i>
        </div>
      </x-input>
      <x-input title='' placeholder="请再次输入新密码" :max="6" type="password" v-model="newPwd2">
        <div slot="label" class="label-wrap">
          <i class="iconfont icon-Secret"></i>
        </div>
      </x-input>

      <x-input title='' placeholder="请输入验证码" :max="6" type="number" v-model="code">
        <div slot="label" class="label-wrap">
          <i class="iconfont icon-youjian"></i>
        </div>
        <x-button v-if="!iscaptchaing" slot="right" type="primary" mini @click.native="getVcode">发送验证码</x-button>
        <countdown v-else slot="right" v-model="counter" :start="iscaptchaing" @on-finish="finish"></countdown>
      </x-input>
    </group>

    <div class="pwd-desc">密码为6位数字</div>
    <div class="btn-wrap follow" :class="{active: isActive}">
      <x-button type="primary" @click.native="confirm" >确认修改</x-button>
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

  .reset-pwd{
    .vux-tab .vux-tab-item.vux-tab-selected{
      color: #5d89eb;
      border-bottom-color: #5d89eb;
    }
    .vux-tab-ink-bar{
      background-color: #5d89eb;
    }
    .weui-cells{
      color: #666666;
      font-size: 14px;
      .label-wrap{
        width: 20px;
        margin-right: 10px;
      }
      .weui-btn_primary{
        width: 100px;
        background-color: #5d89eb;
      }
    }
    .weui-input{
      font-size: 13px;
    }
    .pwd-desc{
      text-align: center;
      color: #999;
      font-size: 13px;
      margin-bottom: -10px;
      line-height: 30px;
    }
    .info{
      font-size: 12px;
      margin: 10px;
      .forget{
        float: right;
        color: #5d89eb;
      }
    }

  }

</style>
<script type="text/ecmascript-6">
  import { Loading, XHeader, Cell, Countdown, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem } from 'vux'

  import Services from '../../common/js/services'
  import _request from '../../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        profile: {},
        cardNo: '',
        code: '',
        newPwd: '',
        newPwd2: '',
        iscaptchaing: false,
        counter: 60
      }
    },
    computed: {
      isActive () {
        return this.cardNo && this.code && this.newPwd && this.newPwd2
      },
      isDisabled () {
        return !this.isActive
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.profile = vm.$router.app.data
        if (!vm.profile) {
          vm.profile = {}
          vm.getProfile()
        }
      })
    },
    methods: {
      getProfile () {
        this.requestPost(Services.myProfile, {
        }, (remoteData) => {
          this.profile = remoteData.data
          this.$router.app.data = remoteData.data
        })
      },
      getVcode () {
        if (!this.profile.phone) {
          this.showToast = true
          this.msg = '手机号为空，验证码发送失败'
          return
        }
        this.iscaptchaing = true
        this.requestPost(Services.getVcode, {
          mobile: this.profile.phone
        }, () => {
          this.showToast = true
          this.msg = '验证码已发送'
        })
      },
      finish () {
        this.iscaptchaing = false
        this.counter = 60
      },
      confirm () {
        if (this.newPwd === '') {
          this.showToast = true
          this.msg = '新密码不能为空'
          return
        }
        if (this.newPwd2 === '') {
          this.showToast = true
          this.msg = '请再次输入新密码'
          return
        }
        if (this.code === '') {
          this.showToast = true
          this.msg = '请输入验证码'
          return
        }
        if (this.newPwd !== this.newPwd2) {
          this.showToast = true
          this.msg = '两次新密码不一样'
          return
        }
        if (/\D/.test(this.newPwd)) {
          this.msg = '密码为6位数字'
          return
        }

        this.requestPost(Services.resetPwd, {
          idcard: this.cardNo,
          newpass: this.newPwd,
          vcode: this.code
        }, (remoteData) => {
          this.showToast = true
          this.msg = '密码已重置'

          this.newPwd = ''
          this.newPwd2 = ''
          this.cardNo = ''
          this.code = ''
          setTimeout(() => {
            this.$router.replace('/')
          }, 1500)
        })
      },
      change () {}
    },
    components: {
      XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading, Cell, Countdown
    }
  }
</script>
