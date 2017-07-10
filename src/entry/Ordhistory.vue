<template>
  <div class="ordhistory">
    <x-header :left-options="{backText: ''}">交易记录</x-header>

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>

    <div class="history-group" v-for="(idx, group) in groupList" :key="idx">
      <div class="date-title">{{group}}</div>
      <div class="history-item" v-for="(item, i) in groupList[group]" :key="" :class="typeClass(item.type)">
        <span class="icon" >{{item.action[0]}}</span>
        <div class="history-detail">
          <p class="name">{{item.action}}</p>
          <p class="desc">{{item.remark }}</p>
          <p class="date">{{item.updated_at}}</p>
        </div>
        <span class="price"><i class="code">{{moneyCode(item.type)}}</i>{{Math.abs(item.amount) | toFixed(2)}}</span>
      </div>

    </div>

    <div class="empty" v-if="list.length ==0">
      暂无交易记录
    </div>

  </div>
</template>
<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';

  .ordhistory{
    height: 100vh;
    background-color: #ededed;
    .vux-header{
      background-color:#4374e2;
      .vux-header-title, .vux-header h1{
        font-size: 15px;
      }
    }
    .empty{
      text-align: center;
      margin-top: 50%;
      color: #666;
      font-size: 14px;
    }
  }
  .history-group{
    .date-title{
      margin-left: 10px;
      font-size: 14px;
    }
    .history-item{
      padding: 10px 10px 0 10px;
      position : relative;
      background-color: #fff;
      .icon{
        position :absolute;
        top: 50%;
        margin-top : -20px;
        height: 40px;
        width: 40px;
        display : inline-block;
        text-align : center;
        border-radius : 5px;
        color: #fff;
        line-height : 40px;
      }
      &.cashout .icon{
        background-color :#f9e935
      }
      &.cashin .icon{
        background-color : #f97c35;
      }
      &.self .icon{
        background-color : #de47f9;
      }
      &.interest .icon{
        background-color : #ff6a59;
      }
      &.invest .icon{
        background-color : #4374e2;
      }
      &.cashin .price, &.interest .price{
        .code{
          font-style: normal;
          color: rgb(238,71,67);
        }
      }
      &.cashout .price{
        .code{
          font-style: normal;
          color: rgb(63, 59, 238);
        }
      }
      .price{
        position: absolute;
        right: 10px;
        top: 50%;
        height: 20px;
        line-height: 20px;
        margin-top: -10px;
        font-size: 14px;
        color: rgb(102,102,102)

      }
      .history-detail{
        margin-left: 50px;
        border-bottom: 1px solid rgb(230,230,230);
        .name{
          color: rgb(102,102,102);
          font-size : 14px;
          height: 16px;line-height : 16px;
          margin-bottom: 5px;
        }
        .desc, .date{
          color: rgb(203,203,203);
          font-size :12px;
          height: 15px;
          line-height : 15px;
        }
        .date{
          margin-bottom: 10px;
          margin-top: 4px;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import vFooter from '../components/footbar'
  import { Loading, Tab, TabItem, Group, Cell, ButtonTab, ButtonTabItem, XHeader } from 'vux'
  import Services from '../common/js/services'
  import _request from '../common/js/request'
  import utils from '../common/js/utils'

  export default {
    mixins: [_request],
    name: 'ordHistory',
    data () {
      return {
        list: [],
        typeClsses: ['', 'cashin', 'invest', 'cashout', 'interest', 'self']
      }
    },
    filters: {
      toFixed (num, precision) {
        return utils.formatNumber(num, precision)
      }
    },
    computed: {
      groupList () {
        let group = {}
        this.list.forEach((item, idx) => {
          let key = item.updated_at.substring(0, 7)
          if (!group[key]) {
            group[key] = []
          }
          group[key].push(item)
        })
        return group
      }
    },
    created () {
      this.getList()
    },
    methods: {
      typeClass (type) {
        return this.typeClsses[type]
      },
      moneyCode (type) {
        if (type == 1 || type == 4) {
          return '+'
        }
        if (type == 3) {
          return '-'
        }
      },
      getList () {
        this.requestPost(Services.myTrade, {}, (remoteData) => {
          this.list = remoteData.money || []
        })
      }
    },
    components: {
      Loading,
      vFooter,
      Tab,
      TabItem,
      Group,
      Cell,
      ButtonTab,
      ButtonTabItem,
      XHeader
    }
  }
</script>
