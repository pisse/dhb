<template>
  <div id="app" class="list">
    <!--<router-view></router-view>-->

    <div id="vux_view_box_body" class="list-wrap">
      <div v-for="i in 5" class="list-item">
        <h3 class="name">第{{i}}期 <span class="borrower">借款人：张先生/27岁</span></h3>
        <flexbox class="content">
          <flexbox-item><span class="revenue">500元</span></flexbox-item>
          <flexbox-item align="center"><span class="time">31天</span></flexbox-item>
          <flexbox-item align="right"><span class="desc">生活消费</span></flexbox-item>
        </flexbox>
        <flexbox class="revest-content">
          <flexbox-item><span class="num"> 分散投资金额</span></flexbox-item>
          <flexbox-item align="center"><span class="">借款期限</span></flexbox-item>
          <flexbox-item align="right"><span class="desc">借款用途</span> </flexbox-item>
        </flexbox>
      </div>
    </div>
    <v-footer type="list"></v-footer>
  </div>
</template>

<script>
import { Tab, TabItem, Sticky, Flexbox, FlexboxItem, XProgress } from 'vux'
import vFooter from '../components/footbar'
export default {
  name: 'app',
  data () {
    return {
      percent: 80
    }
  },
  methods: {
  },
  components: {
    vFooter,
    Tab,
    TabItem,
    Sticky,
    Flexbox,
    FlexboxItem,
    XProgress
  }
}
</script>

<style lang="less">
  @import '../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';

  .list{
    .list-wrap{
      background-color: #fbf9fe;
    }
    .list-item{
      padding: 10px;
      text-align: center;
      margin-bottom: 10px;
      background-color: #fff;
      .content{
        padding:5px 0 0 0;
      }
      .revest-content{
        font-size:12px;
        margin-top: 5px;
        .percent-wrap{
          text-align: center;
          .weui-progress__inner-bar{
            background-color: #5d89eb;
          }
        }
      }
      .name{
        text-align: left;
        font-size: 14px;
        font-weight: normal;
        border-bottom: 1px solid rgb(230,230,230);
        padding-bottom: 5px;
        .borrower{
          float: right;
          color: rgb(230,230,230);
          font-size: 12px;
        }
      }
      .revenue{
        color: rgb(238,71,67);
      }
    }
  }

</style>
