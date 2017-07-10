<template>
  <div id="app" class="manage-detail bg">
    <!--<router-view></router-view>-->

  <!--  <div class="namage-name">
      月盈宝-信17WQ2期 <span class="status">已还款</span>
    </div>-->
    <x-header :left-options="{backText: ''}">月盈宝-信17WQ2期</x-header>
    <div class="manage-list-wrap">
      <div class="manage-list-item">
        <h4 class="title"><i class="iconfont icon-iconfonthuankuankuai"></i>回款信息</h4>
        <div class="list-item">
          <span class="name">月盈宝-信17WQ2期</span>
          <span class="text">12121.12元</span>
        </div>
        <div class="list-item">
          <span class="name">还款日</span>
          <span class="text">2017-05-08</span>
        </div>
        <div class="list-item">
          <span class="name">状态</span>
          <span class="text">已还款</span>
        </div>
        <div class="list-item">
          <span class="name">已收利息</span>
          <span class="text">12121.12元</span>
        </div>
        <div class="list-item">
          <span class="name">已还本金</span>
          <span class="text">12121.12元</span>
        </div>
      </div>
      <div class="manage-list-item">
        <h4 class="title"> <i class="iconfont icon-xiangmu1"></i> 项目信息</h4>
        <div class="list-item">
          <span class="name">月盈宝-信17WQ2期</span>
          <span class="text">12121.12元</span>
        </div>
        <div class="list-item">
          <span class="name">还款日</span>
          <span class="text">2017-05-08</span>
        </div>
        <div class="list-item">
          <span class="name">状态</span>
          <span class="text">已还款</span>
        </div>
        <div class="list-item">
          <span class="name">已收利息</span>
          <span class="text">12121.12元</span>
        </div>
        <div class="list-item">
          <span class="name">已还本金</span>
          <span class="text">12121.12元</span>
        </div>
      </div>
    </div>

    <div class="order-register">

    </div>

  <!--  <v-footer type="home"></v-footer>-->
  </div>
</template>

<script>
import vFooter from '../components/footbar'
import { XHeader, Tab, TabItem, Group, Cell, ButtonTab, ButtonTabItem } from 'vux'

export default {
  name: 'app',
  data () {
    return {
      isShow: true,
      list4: ['提现', '充值']
    }
  },
  methods: {
    toggleShow () {
      this.isShow = !this.isShow
    }
  },
  components: {
    XHeader,
    vFooter,
    Tab,
    TabItem,
    Group,
    Cell,
    ButtonTab,
    ButtonTabItem
  }
}
</script>

<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  .manage-detail{
    .namage-name{
      height: 35px;
      line-height: 35px;
      background-color: #fff;
      margin-bottom: 10px;
      font-size: 14px;
      padding-left: 10px;
      color: rgb(238,71,67);

      .status{
        float: right;
        color: rgb(51,51,51);
        font-size: 12px;
        margin-right: 10px;
      }
    }

    .manage-list-wrap{
      margin-top: 5px;
    }
    .manage-list-item{
      font-size: 12px;
      margin-bottom: 10px;
      background-color: #fff;
      color: #979797;
      .title{
        height: 30px;
        line-height: 30px;
        margin:0 10px;
        font-weight: normal;
        color: #ee4743;
        margin-bottom: 5px;
        border-bottom: 1px solid rgb(230,230,230);
      }
      .list-item{
        padding: 2px 10px;
        display: flex;
        .name{
          flex: 0 0 50%;
          width: 50%
        }
        .text{
          text-align: right;
          flex: 1;
        }
        &:first-child{
          .name{
            color: rgb(238,71,67);
          }
        }
        &:last-child{
          padding-bottom: 5px;
        }
      }
    }
  }

</style>
