<template>
  <div class="chgpwd bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">修改密码</x-header>


    <group>
      <x-input title='' placeholder="请输入原密码" :max="6" type="password" v-model="old"></x-input>
      <x-input title='' placeholder="请输入新密码" :max="6" type="password" v-model="new1" ></x-input>
      <x-input title='' placeholder="请再次输入新密码" :max="6" type="password" v-model="new2"></x-input>
    </group>

    <div class="pwd-desc">密码为6位数字</div>
    <div class="btn-wrap follow" :class="{active: isActive}">
      <x-button type="primary" @click.native="confirm" :disabled="isDisabled">确认修改</x-button>
    </div>


    <div class="info">
      初始密码：000000
      <span class="forget" @click="goReset">忘记密码</span>
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

  .chgpwd{
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
  import { Loading, XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem } from 'vux'

  import Services from '../../common/js/services'
  import _request from '../../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        profile: {},
        old: '',
        new1: '',
        new2: ''
      }
    },
    computed: {
      isActive () {
        return this.old && this.new1 && this.new2
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
      goReset () {
        this.$router.push({path: '/chgpwd/reset'})
      },
      confirm () {
        if (this.old === '') {
          this.showToast = true
          this.msg = '原密码不能为空'
          return
        }
        if (this.new1 === '') {
          this.showToast = true
          this.msg = '新密码不能为空'
          return
        }
        if (this.new2 === '') {
          this.showToast = true
          this.msg = '请再次输入新密码'
          return
        }
        if (this.new1 !== this.new2) {
          this.showToast = true
          this.msg = '两次新密码不一样'
          return
        }
        if (/\D/.test(this.new1)) {
          this.msg = '密码为6位数字'
          return
        }

        this.requestPost(Services.newPwd, {
          oldpass: this.old,
          idcard: this.profile.idcard,
          newpass: this.new1,
          vcode: ''
        }, (remoteData) => {
          this.showToast = true
          this.msg = '修改成功'

          this.old = ''
          this.new1 = ''
          this.new2 = ''
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
      },
      change () {}
    },
    components: {
      XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading
    }
  }
</script>
