<template>
  <div class="register bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">注册账号</x-header>

    <div class="step-wrap">
      <step v-model="step">
        <step-item :title="$t('输入手机号')" description=""></step-item>
        <step-item :title="$t('设置密码')" description=""></step-item>
      </step>
    </div>

    <template v-if="step==0">
      <group>
        <x-input title='' v-model="phone" placeholder="请输入您的手机号" type="tel"></x-input>
      </group>

      <div class="agreement">
        <checklist title="" :label-position="labelPosition" required :options="commonList" v-model="checkAgree" @on-change="change"></checklist>
      </div>

      <div class="btn-wrap follow active">
        <x-button type="primary" @click.native="next">下一步</x-button>
      </div>
    </template>
    <template v-else>
      <group>
        <x-input title='' placeholder="请输入密码" type="password" v-model="pwd"></x-input>
        <x-input title='' placeholder="请再次输入密码" type="password" v-model="pwd2"></x-input>
      </group>
      <div class="btn-wrap follow active">
        <x-button type="primary" @click.native="register">立即注册</x-button>
      </div>
    </template>

    <toast v-model="showToast" type="text">{{msg}}</toast>

  </div>
</template>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  .register{
    font-size: 14px;
    .vux-step-item-head-process .vux-step-item-head-inner{
      border-color: #5d89eb;
      background-color: #5d89eb;
    }
    .vux-step-item-head-finish .vux-step-item-head-inner{
      border-color: #5d89eb;
    }
    .vux-step-item-tail-finish{
      background-color: #5d89eb;
    }
    .step-wrap{
      padding: 5px 15px;
      background-color: #fff;
      .weui-icon-success-no-circle{
        color: #5d89eb;
      }
    }
    .weui-input{
      font-size: 13px;
    }
    .agreement .weui-cells{
      margin-top: 5px;
      margin-bottom: 15px;
      font-size: 12px;
      background-color: inherit;
      .weui-cell{
        padding: 0;

        .weui-icon-checked:before{
          font-size: 16px;
        }
        .weui-check:checked  + .vux-checklist-icon-checked:before{
          color: #5d89eb;
        }
      }
      &:after,&:before{
        border: 0;
      }
    }
  }

</style>
<script type="text/ecmascript-6">
  import { XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast } from 'vux'

  import Services from '../common/js/services'
  import _request from '../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        phone: '',
        pwd: '',
        pwd2: '',
        step: 0,
        checkAgree: ['我已阅读并同意用户协议'],
        labelPosition: '',
        commonList: ['我已阅读并同意用户协议']
      }
    },
    methods: {
      $t (t) {
        return t
      },
      next () {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
          this.showToast = true
          this.msg = '手机号格式不对'
          return
        }
        this.step = 1
      },
      register () {
        if (this.pwd === '') {
          this.showToast = true
          this.msg = '密码不能为空'
          return
        }
        if (this.pwd2 === '') {
          this.showToast = true
          this.msg = '请再次输入密码'
          return
        }
        if (this.pwd !== this.pwd2) {
          this.showToast = true
          this.msg = '密码不一致'
          return
        }
        this.request(Services.register, {
          mobile: this.phone,
          pwd: this.pwd
        }, (remoteData) => {
          this.showToast = true
          this.msg = '注册成功，请前往登录'
        })
      },
      change () {}
    },
    components: {
      XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast
    }
  }
</script>
