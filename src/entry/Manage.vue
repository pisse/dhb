<template>
  <div id="app" class="manage bg">
    <!--<router-view></router-view>-->

    <x-header :left-options="{backText: ''}">我的项目</x-header>

    <!--<div class="tabs-wrap">
      <span class="tab-item selected">投资中</span>
      <span class="tab-item">可转让</span>
      <span class="tab-item">已完结</span>
    </div>-->

    <!--<div class="history">
      历史累计还款(元) <br>
      <span class="price">
        183,121,121,121 <i class="yen">元</i>
      </span>
    </div>-->

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>

    <div class="manage-list-wrap">
      <div class="manage-list-item" @click="goDetail(item.invest_list_id)" v-for="(item, idx) in list" :key="idx">
        <div class="list-item">
          <span class="name">{{item.invest_title}}</span>
          <span class="text">债权详情</span>
        </div>
        <div class="list-item">
          <span class="name">状态</span>
          <span class="text">{{item.interest_is_payed ? '已结束': '投资中'}}</span>
        </div>
        <div class="list-item">
          <span class="name">待收本金</span>
          <span class="text">{{item.invest_amount |toFixed(2)}}</span>
        </div>
        <div class="list-item">
          <span class="name">{{interestText(item.interest_is_payed)}}</span>
          <span class="text">{{item.interest}}</span>
        </div>
        <div class="list-item">
          <span class="name">{{item.interest_is_payed ? '还款日': '预计还款日'}}</span>
          <span class="text">{{item.interest_is_payed  ? item.invest_end_date_real : item.invest_end_date }}</span>
        </div>

        <div class="list-item"  @click.prevent.stop="contract(item, $event)">
          <span class="name">查看合同</span>
          <span class="text"> <x-icon type="ios-arrow-right" size="10"></x-icon></span>
        </div>

        <div class="right-wrap">
          <i class="iconfont icon-youicon"></i>
        </div>
        <!--<div class="list-item" @click="debtList(item.invest_list_id)">
          <span class="name">债权详情</span>
          <span class="text"> <x-icon type="ios-arrow-right" size="10"></x-icon></span>
        </div>-->
      </div>
    </div>
    <div class="empty" v-if="list.length ==0">
      暂无项目记录
    </div>

  </div>
</template>

<script>
import vFooter from '../components/footbar'
import { Loading, Tab, TabItem, Group, Cell, ButtonTab, ButtonTabItem, XHeader } from 'vux'
import Services from '../common/js/services'
import _request from '../common/js/request'
import utils from '../common/js/utils'

export default {
  mixins: [_request],
  name: 'manage',
  data () {
    return {
      list: []
    }
  },
  filters: {
    toFixed (num, precision) {
      return utils.formatNumber(num, precision)
    }
  },
  created () {
    this.getList()
  },
  methods: {
    interestText (isPayed) {
      // let now = new Date().toLocaleDateString()
      return isPayed ? '已收利息' : '待收利息'
    },
    goDetail (id) {
      // location.href = 'managedetail.html'
      this.$router.push({path: 'records', query: {id: id}})
    },
    getList () {
      this.requestPost(Services.myInvestList, {}, (remoteData) => {
        this.list = remoteData.invest || []
      })
    },
    debtList (id) {
      this.$router.push({path: 'records', query: {id: id}})
    },
    contract (item, e) {
      this.$router.app.data = item
      this.$router.push({path: 'contract', query: {id: item.invest_list_id}})
    }
  },
  components: {
    vFooter,
    Tab,
    TabItem,
    Group,
    Cell,
    ButtonTab,
    ButtonTabItem,
    Loading,
    XHeader
  }
}
</script>

<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  .manage{
    .tabs-wrap{
      margin: 10px;
      display: flex;
      text-align: center;
      color: #4374e2;
      border: 1px solid #4374e2;
      border-radius: 5px;
      background-color: #fff;
      font-size: 12px;
      .tab-item{
        flex: 1;
        padding: 5px 0;
        border-right: 1px solid #4374e2;
        &:last-child{
          border-right: 0;
        }
        &.selected{
          background-color: #4374e2;
          color: #fff;
        }
      }
    }
    .tab-wrap{
      padding: 10px;
    }
    .history{
      background-color: #fff;
      text-align: center;
      font-size: 12px;
      padding: 20px;
      margin-bottom: 10px;
      color: rgb(151,151,151);
      .price{
        font-size: 25px;
        color: rgb(238,71,61);
        .yen{
          font-size: 13px;
          font-style: normal;
        }
      }
    }
    .manage-list-wrap{
      background-color: #ededed;
      padding-top: 5px;
    }
    .manage-list-item{
      position: relative;
      font-size: 13px;
      margin-bottom: 10px;
      background-color: #fff;
      padding-bottom: 5px;
      padding-top: 5px;
      .list-item{
        color: rgb(151,151,151);
        padding: 2px 25px 2px 15px;
        display: flex;
        .name{
          flex: 0 0 50%;
          width: 50%
        }
        .text{
          text-align: right;
          flex: 1;
          color: rgb(102,102,102);
        }
        &:first-child{
          font-size: 15px;
          .name{
            color: rgb(238,71,67);
          }
          .text{
            font-style: italic;
            color: #4374e2;
          }
        }
      }
      .right-wrap{
        position: absolute;
        right: 0;
        top: 50%;
        font-size: 0;
        line-height: 30px;
        height: 30px;
        margin-top: -15px;
        .iconfont{
          font-size: 30px;
        }
      }
    }
    .empty{
      text-align: center;
      margin-top: 50%;
      color: #666;
      font-size: 14px;
    }
  }

</style>
