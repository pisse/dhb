<template>
  <div class="addmobile bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">绑定手机号</x-header>


    <group>
      <x-input title='' placeholder="请输入手机号" type="number" v-model="mobile"></x-input>
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
  import { Loading, XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem } from 'vux'

  import Services from '../../common/js/services'
  import _request from '../../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        name: '',
        idcard: '',
        mobile: ''
      }
    },
    computed: {
      isActive () {
        return this.mobile && (/^1[3|4|5|8][0-9]\d{8}$/.test(this.mobile))
      }
    },
    methods: {
      bind () {
        if (!this.isActive) {
          this.showToast = true
          this.msg = '手机号格式不对'
          return
        }
        this.requestPost(Services.bindMobile, {
          mobile: this.mobile
        }, (remoteData) => {
          this.showToast = true
          this.msg = '修改成功'

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
      XHeader, Step, StepItem, XInput, Group, Checklist, XButton, Toast, Tab, TabItem, Loading
    }
  }
</script>
