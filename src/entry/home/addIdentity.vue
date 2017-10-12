<template>
  <div class="addidentity bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">实名认证</x-header>


    <group>

      <template v-if="authStatus==0">
        <x-input title='' placeholder="请输入真实姓名" type="text" v-model="name"></x-input>
        <x-input title='' placeholder="请输入身份证号" type="text" v-model="idcard"></x-input>
        <!--<x-input title='' placeholder="请输入手机号" type="number" v-model="mobile"></x-input>-->
      </template>

      <template v-else>
        <cell title="真实姓名"  value-align="right" >{{profile.idcard_name}}
          <i class="iconfont" :class="{'icon-shenhezhong': authStatus==1, 'icon-yirenzheng2': authStatus==10} ">
          </i>
        </cell>
        <cell title="身份证" :value="cartNo(profile.idcard)"  value-align="right"></cell>
      </template>

    </group>

    <div v-if="authStatus==0" class="btn-wrap follow" :class="{active: isActive}">
      <x-button type="primary" @click.native="login">立即绑定</x-button>
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
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>

    <toast width="12em" v-model="showToast" type="text">{{msg}}</toast>

  </div>
</template>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '../../assets/less/base.less';

  .addidentity{
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
    .weui-cells{
      margin-top: 0;
      font-size: 13px;
      color: rgb(151,151,151);
      .icon-shenhezhong, .icon-iconfontyuanjiaojuxing1eps{
        color: rgb(238,71,67)
      }
      .icon-yirenzheng2{
        color: #4374e2
      }

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
  import { Loading, XHeader, XDialog, Cell, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem } from 'vux'

  import Services from '../../common/js/services'
  import _request from '../../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        isAuth: false,
        authStatus: 0, // 0未认证，1认证中 10认证成功
        name: '',
        idcard: '',
        mobile: '',
        profile: {},

        showConfirm: false,
        confirmMsg: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.profile = vm.$router.app.data
      })
    },
    computed: {
      isActive () {
        return this.name && this.idcard
      }
    },
    created () {
      this.checkIsAuth()
    },
    methods: {
      checkIsAuth () {
        this.requestPost(Services.isAuth, {
        }, (remoteData) => {
          this.isAuth = remoteData.isAuth
          this.authStatus = remoteData.auth_status
        })
      },
      login () {
        if (this.name === '') {
          this.showToast = true
          this.msg = '账户名不能为空'
          return
        }
        if (this.idcard === '') {
          this.showToast = true
          this.msg = '身份证号不能为空'
          return
        } else if (this.idcard.length != 18) {
          this.showToast = true
          this.msg = '请输入18位身份证号'
          return
        }
        /* if (this.mobile && !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.mobile))) {
          this.showToast = true
          this.msg = '手机号格式不对'
          return
        } */
        this.requestPost(Services.bindCard, {
          name: this.name,
          idcard: this.idcard
          // mobile: this.mobile
        }, (remoteData) => {
          this.showConfirm = true
          this.confirmMsg = '您已提交认证，请耐心等待审核。'
        })
      },
      onConfirm () {
        this.showConfirm = false
        this.reset()
        this.$router.go(-1)
      },
      cartNo (number) {
        let numstr = number + ''
        if (number) {
          return '**** **** **** ' + numstr.substring(numstr.length - 4, numstr.length)
        } else {
          return ''
        }
      },
      reset () {
        this.name = ''
        this.idcard = ''
        // this.mobile = ''
      },
      change () {}
    },
    components: {
      XHeader, XDialog, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading, Cell
    }
  }
</script>
