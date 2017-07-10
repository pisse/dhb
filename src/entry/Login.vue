<template>
  <div class="register bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">亿佰</x-header>

    <tab>
      <tab-item selected @on-item-click="onItemClick">账号登录</tab-item>
      <tab-item @on-item-click="onItemClick" :style="{visibility: 'hidden'}">手机验证登录</tab-item>
    </tab>

    <group>
      <x-input title='' placeholder="用户名" type="password" v-model="name"></x-input>
      <x-input title='' placeholder="请输入密码" type="password" v-model="pwd"></x-input>
    </group>

    <div class="btn-wrap follow" :class="{active: isActive}">
      <x-button type="primary" @click.native="login">登录</x-button>
    </div>

    <div class="account-other">
      <span class="register"><a href="./register.html">立即注册</a> </span>
      <span class="forget">忘记密码</span>
    </div>

    <toast width="12em" v-model="showToast" type="text">{{msg}}</toast>

  </div>
</template>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  .register{
    .vux-tab .vux-tab-item.vux-tab-selected{
      color: #5d89eb;
      border-bottom-color: #5d89eb;
    }
    .vux-tab-ink-bar{
      background-color: #5d89eb;
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
  import { XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading } from 'vux'

  import Services from '../common/js/services'
  import _request from '../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        name: '',
        pwd: ''
      }
    },
    computed: {
      isActive () {
        return this.name && this.pwd
      }
    },
    methods: {
      onItemClick () {},
      $t (t) {
        return t
      },
      login () {
        if (this.name === '') {
          this.showToast = true
          this.msg = '账户名不能为空'
          return
        }
        if (this.pwd === '') {
          this.showToast = true
          this.msg = '密码不能为空'
          return
        }
        this.requestPost(Services.login, {
          uname: this.name,
          pwd: this.pwd
        }, (remoteData) => {
          location.href = './index.html'
        })
      },
      change () {}
    },
    components: {
      XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading
    }
  }
</script>
