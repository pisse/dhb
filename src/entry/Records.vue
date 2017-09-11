<template>
  <div id="app" class="records bg">
    <!--<router-view></router-view>-->
    <x-header :left-options="{backText: ''}">债权详情</x-header>


    <template v-if="records.length !=0">
      <div class="list-head">
        <span class="column-name">借款人</span>
        <span class="column-amount">金额（元）</span>
      </div>
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="10" height="-56">
        <div class="records-list">
            <div class="record-item" v-for="(record, idx) in records" >
              <p class="account">{{record.realName}}</p>
              <p class="date">{{record.days}}天</p>
              <span class="amount">{{record.amount | toFixed(2)}}</span>
            </div>
          <load-more tip="加载中..."></load-more>
        </div>
      </scroller>
    </template>
    <div class="empty" v-else>
      暂无记录
    </div>

    <div v-transfer-dom>
      <loading v-model="isLoading" text="加载中..."></loading>
    </div>
    <toast width="12em" :time="2000" v-model="showToast" type="text">{{msg}}</toast>

  </div>
</template>

<script>
import { Scroller, XHeader, Toast, Loading, LoadMore } from 'vux'
import Services from '../common/js/services'
import _request from '../common/js/request'
import utils from '../common/js/utils'

export default {
  mixins: [_request],
  name: 'app',
  data () {
    return {
      records: [],
      listLoading: false
    }
  },
  filters: {
    toFixed (num, precision) {
      return utils.formatNumber(num, precision)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.currentPage = 0
      vm.getRecords()
    })
  },
  created () {
    // this.getRecords()
  },
  methods: {
    getRecords () {
      var id = utils.getParams('', 'id')
      this.currentPage = this.currentPage + 1
      this.requestPost(Services.prodRecordsDetail, {
        page: this.currentPage,
        page_size: this.pageSize,
        invest_list_id: id
      }, (remoteData) => {
        this.records = this.records.concat(remoteData.data)
        this.$nextTick(() => {
          this.$refs.scrollerBottom.reset()
        })
      })
    },
    onScrollBottom () {
      if (this.isLoading) {
      } else {
        this.getRecords()
      }
    }
  },
  components: {
    Scroller, XHeader, Loading, Toast, LoadMore
  }
}
</script>

<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../assets/less/base.less';

  .records{
    .list-head{
      color: rgb(51,51,51);
      font-size: 13px;
      padding: 5px 10px;
      border-bottom: 1px solid rgb(242,242,242);
      margin-bottom: 2px;
      background: #fff;
      .column-amount{
        float: right;
      }
    }
    .records-list{
      background-color: #fff;
      padding: 0 10px;
      .record-item{
        position: relative;
        font-size: 14px;
        padding: 6px 0;
        line-height: 20px;
        border-bottom: 1px solid rgb(242,242,242);
        .account{
          color: rgb(51,51,51);
        }
        .date{
          color: rgb(151,151,151);
          font-size: 12px;
        }
        .amount{
          position: absolute;
          right: 0;
          top: 16px;
          color: rgb(51,51,51);
          font-size: 14px;
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
