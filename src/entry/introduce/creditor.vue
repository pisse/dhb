<template>
  <div id="app" class="creditor">
    <!--<router-view></router-view>-->
   <!-- <x-header :left-options="{backText: ''}">华肖理财</x-header>-->

    <!--<div class="btn-wrap follow">
      <x-button type="primary" @click.native="loginOut">退出登录</x-button>
    </div>-->

    <div class="img-wrap">
      <div class="content">
        <img width="100%" src="../../assets/imgs/creditor.jpg" alt="">
      </div>
    </div>

    <div class="item">
      <h3 class="title">
        消费金融贷
      </h3>

      <div class="content mortgage" style="display: block;">
        <h3>什么是消费金融贷？</h3>
        <p class="border">资产方通过消费金融公司向各阶层消费者提供消费贷款的现代金融服务。</p>
        <h3>风控审核流程</h3>
        <p>大数据风控预知潜在风险，小额分散投资降低风险。</p>
        <ul>
          <li>
            <h3>1．合作方调查 </h3>
            <p>全面调查合作机构经营状况和风控能力 </p>
          </li>
          <li>
            <h3>2．反欺诈模型 </h3>
            <p>黑名单排除以及个人/团伙欺诈策略部署 </p>
          </li>
          <li>
            <h3>3．真实性验证 </h3>
            <p>对借款人背景、联系人进行多渠道、全方面验证 </p>
          </li>
          <li>
            <h3>4．信用模型评估 </h3>
            <p>大数据征信对借款人还款意愿和还款能力综合评估 </p>
          </li>
          <li>
            <h3>5．二次风控 </h3>
            <p>适用先进计量方法对借款人二次评分，并剔除高危债权</p>
          </li>
          <li>
            <h3>6．材料复核</h3>
            <p> 复核借款人和标的资料，保证借款真实有效</p>
          </li>
          <li>
            <h3>7．动态监控 </h3>
            <p>资产表现实时评估，对问题征兆提前采取行动</p>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
import vFooter from '../../components/footbar'
import { Tab, Loading, TabItem, Group, Cell, ButtonTab, ButtonTabItem, XHeader, XButton } from 'vux'
// import Services from '../../common/js/services'
// import _request from '../../common/js/request'

export default {
  name: 'app',
  data () {
    return {
      profile: {}
    }
  },
  computed: {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.getProfile()
    })
  },
  created () {
  },
  methods: {
    onItemClick (index) {
      console.log(index)
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
    XHeader,
    XButton,
    Loading
  }
}
</script>

<style lang="less">
  @import '../../assets/css/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '../../assets/less/base.less';

  .creditor{
    background-color: #ededed;
    min-height: 100vh;
    font-size: 12px;
    .img-wrap{
      .content{
        margin-bottom: 10px;
        font-size: 0;
      }
    }
    .item{
      background-color: #fff;
      .title{
        color: rgb(51,51,51);
        font-size: 1.3333333333em;
        font-weight: bold;
        padding: .5333333333rem 1em;
        border-bottom: 1px solid #e5e5e5;
      }

    }
    .item .content.mortgage {
      padding-left: 15px;
    }

    .item .content.mortgage img {
      width: 10rem;
      height: 6.6266666667rem
    }

    .item .content.mortgage>h3 {
      font-size: 15px;
      line-height: 35px;
      position: relative;
      padding-left: 15px;
      font-weight: normal;
    }

    .item .content.mortgage>h3:before {
      content: '';
      display: block;
      position: absolute;
      top: 9px;
      left: 0;
      width: 4px;
      height: 15px;
      background-color: #fd5353;
      border-radius: 7px;
    }

    .item .content.mortgage p {
      font-size: 12px;
      line-height:24px;
      color: gray
    }

    .item .content.mortgage>p.border {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 0.6em
    }

    .item .content.mortgage ul {
      padding: 1rem 0
    }

    .item .content.mortgage ul li {
      padding: 0 10px 15px 35px;
      background: url("../../assets/imgs/icon-01.jpg") no-repeat 0 2px;
      background-size: 23px 23px;
      position: relative;
      display: block;
      line-height: 24px;
    }

    .item .content.mortgage ul li:nth-child(2) {
      background-image: url("../../assets/imgs/icon-02.jpg")
    }

    .item .content.mortgage ul li:nth-child(3) {
      background-image: url("../../assets/imgs/icon-03.jpg")
    }

    .item .content.mortgage ul li:nth-child(4) {
      background-image: url("../../assets/imgs/icon-04.jpg")
    }

    .item .content.mortgage ul li:nth-child(5) {
      background-image: url("../../assets/imgs/icon-05.jpg")
    }

    .item .content.mortgage ul li:nth-child(6) {
      background-image: url("../../assets/imgs/icon-06.jpg")
    }

    .item .content.mortgage ul li:nth-child(7) {
      background-image: url("../../assets/imgs/icon-07.jpg")
    }

    .item .content.mortgage ul li:after {
      content: '';
      display: block;
      width: 1px;
      height: 27px;
      position: absolute;
      left: 10px;
      bottom: 0;
      background-color: #fd5353
    }

    .item .content.mortgage ul li:nth-child(5):after {
      height: 1.3333333333rem
    }

    .item .content.mortgage ul h3 {
      font-size: 14px;
      font-weight: normal;
    }

  }
</style>
