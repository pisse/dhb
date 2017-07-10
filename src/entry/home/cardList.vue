<template>
  <div class="cardlist bg">
    <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true">银行卡管理</x-header>

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>


    <template  v-if="profile.bankcard && profile.bankcard.length">
      <div class="card-list-wrap">
        <div class="card-list-item" v-for="(card, idx) in profile.bankcard" :key="idx" @click="showDelete(card.card_no)">
          <cell :title="card.bank_name" value="" >
            <div slot="icon">
              <i class="iconfont" :class="backIcon(card.bank_name)"></i>
            </div>
          </cell>

          <cell :title="cartNo(card.card_no)" value="" >
            <div slot="icon">
              <i class="iconfont" ></i>
            </div>
          </cell>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="card-empty">
        尚未绑定银行卡
      </div>
    </template>

    <group class="group-wrap" label-width="8" label-margin-right="2em" label-align="left">
      <cell title="添加银行卡" value="" is-link  link="/cardlist/add" >
        <div slot="icon">
          <x-icon type="ios-plus-outline" size="14"></x-icon>
        </div>
      </cell>
    </group>

    <toast width="12em" v-model="showToast" type="text">{{msg}}</toast>

    <actionsheet v-model="showDel" :menus="menus" show-cancel  @on-click-menu-delete="onDelete"></actionsheet>

  </div>
</template>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '../../assets/less/base.less';

  .cardlist{
    .card-list-wrap{
      margin: 10px;
      .card-list-item{
        position: relative;
        // height: 80px;
        border-radius: 4px;
        background-color: #5d89eb;
        color: #fff;
        margin-bottom: 10px;
        .weui-cell{
          padding: 0 15px;
        }
        .weui-cell__hd>div{
          width: 40px;
          font-size: 0;
        }
        .iconfont {
          font-size: 30px;
          margin-right: 10px;
        }
      }
    }
    .card-empty{
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: rgb(51,51,51);
      font-size: 14px;
    }
    .weui-cells{
      margin-top: 0;
    }
    .group-wrap{
      .vux-x-icon {
        fill: rgb(102,102,102);
      }
      .vux-label{
        font-size: 15px;
        margin-left: 5px;
        color: rgb(51,51,51);
      }

    }
  }

</style>
<script type="text/ecmascript-6">
  import { Loading, XHeader, Step, StepItem, Actionsheet, XInput, Group, Cell, Checklist, XButton, Toast, Tab, TabItem, Icon } from 'vux'

  import Services from '../../common/js/services'
  import _request from '../../common/js/request'

  export default {
    mixins: [_request],
    data () {
      return {
        profile: {},
        backList: {
          '工商银行': 'icon-gongshangyinhangicbcbank1193388easyiconnet',
          '农业银行': 'icon-nongyeyinhang',
          '建设银行': 'icon-jiansheyinhangbank1193390easyiconnet',
          '中国银行': 'icon-zhongguoyinhangbank1193437easyiconnet',
          '招商银行': 'icon-zhaoshangyinhangbank1193432easyiconnet',
          '光大银行': 'icon-guangdayinxingyy',
          '浦发银行': 'icon-iconfontshanghaipudongfazhanyinxing',
          '上海银行': 'icon-shanghaiyinxing'
        },
        showDel: false,
        menus: {
          delete: '<span style="color:red">解绑</span>'
        },
        selectedCardNo: ''
      }
    },
    computed: {
      isActive () {
        // return this.old && this.new1 && this.new2
      },
      isDisabled () {
        // return !this.isActive
      }
    },
    created () {
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getProfile()
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
      showDelete (no) {
        this.showDel = true
        this.selectedCardNo = no
      },
      onDelete () {
        this.requestPost(Services.unbindCard, {
          card_no: this.selectedCardNo
        }, (remoteData) => {
          this.selectedCardNo = ''
          this.showToast = true
          this.msg = '解绑成功'
          this.getProfile()
        })
      },
      backIcon (bankName) {
        let icon = this.backList[bankName]
        return icon
      },
      cartNo (number) {
        let numstr = number + ''
        if (number) {
          return '**** **** **** ' + numstr.substring(numstr.length - 4, numstr.length)
        } else {
          return ''
        }
      }
    },
    components: {
      XHeader, Step, StepItem, XInput, Group, Cell, Checklist, XButton, Toast, Tab, TabItem, Loading, Icon, Actionsheet
    }
  }
</script>
