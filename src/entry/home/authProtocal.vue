<template>
    <div id="app" class="authprotocal">
        <div>
            <div>
                <div style="text-align:center;font-size:1.5rem;font-weight:bold;">授权委托书</div>
                <br>
                授权人：&nbsp;{{this.profile.idcard_name}}
                <br>
                被授权人：上海华肖网络科技有限公司
                <br><br>

                授权人同意并签署本授权委托书，在此通过本授权委托书作出如下授权与承诺：

                <br>
                一、授权人一经签署本授权委托书，即视为已经同意并授权被授权人及与被授权人合作方的指定第三方银行或第三方支付机构（以下简称“指定第三方”）对授权人通过被授权人运营的网络平台（以下简称“被授权人平台”）发起放款项目进行身份信息验证、银行卡验证等必要的信息验证。
                <br><br>
                二、授权人同意，在各相关协议生效后，指定第三方有权依照各相关协议约定的期限和金额从授权人通过本授权委托书指定的银行卡（银行卡账户信息见第十三条）进行资金的代扣、代还、代付及划转各相关协议项下的全部应付款项。
                <br><br>
                三、授权人承诺，本授权委托书第十三条记载的授权银行卡账户是以本人真实姓名开立的合法、有效的银行卡账户，授权人同意本授权委托书第一条、第二条约定的资金代扣及转账优先于该账户其他任何用途的支付。
                <br><br>
                四、授权人同意，与本授权委托书项下的资金代扣、代还、代付及划转服务相关的任何责任，如在放款成功后，因指定第三方的系统维护等任何原因导致无法将款项代还至授权指定的银行卡账户中等情况发生，被授权人、被授权人合作方及指定第三方亦无需承担责任。
                <br><br>
                五、授权人在指定银行卡账户中必须留有足够余额，否则因账户余额不足或不可归责于被授权人的任何事由，导致无法及时扣款或扣款错误、失败，责任由授权人自行承担。
                <br><br/>
                六、各相关协议的债权人按照相关协议约定和被授权人平台规则转让各相关协议项下的债权的，不影响本授权委托书的有效性。
                <br/><br/>
                七、授权人针对授权人指定的银行卡账户向被授权人进行授权后，即视为授权人就该银行卡在授权人通过被授权人平台发起的所有放款项目范围内进行了授权，不因授权人后续更换绑定银行卡，或对其他银行卡进行授权而无效或产生任何影响。
                <br><br>
                八、本授权委托书为授权人对被授权人从其授权的指定账户中扣款和/或向该账户转账的授权证明，不作为收付现金的直接凭据。
                <br><br>
                九、凡本授权委托书中未约定的事项，适用各相关协议的约定，凡本授权委托书中出现的与各相关协议相同的词语或术语，如果在本授权委托书中无特别定义，适用各相关协议中相同词语和术语的定义、涵义或解释，本授权委托书的规定与各相关协议不一致的，以本授权委托书的规定为准。
                <br><br/>
                十、授权人发起终止授权或变更账户、通讯地址时，在当期款项支付日2个工作日前通知被授权人并完成信息更新，否则自行承担所造成的风险损失。
                <br><br>
                十一、授权人保证本授权委托书的真实性、合法性、有效性，被授权人依据本授权委托书进行的操作引起的一切法律纠纷或风险，由授权人独立承担或解决。
                <br><br>
                十二、本授权委托书自授权人确认同意起生效，至授权人通过被授权人平台签订的全部相关协议履行完毕，所有款项全部还清时终止。
                <br><br>
                十三、授权人资料：
                 <div class="table-wrap">
                     <x-table>
                        <thead>
                            <tr>
                                <th width="50"></th>
                                <th width="50"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>姓名</td>
                                <td>{{this.profile.idcard_name}}</td>
                            </tr>
                            <tr>
                                <td>身份证号码</td>
                                <td>{{this.profile.idcard}}</td>
                            </tr>
                            <tr>
                                <td>联系手机</td>
                                <td>{{this.profile.phone}}</td>
                            </tr>
                            <tr>
                                <td>借记卡户名</td>
                                <td>{{this.name || this.profile.idcard_name}}</td>
                            </tr>
                            <tr>
                                <td>借记卡开户银行</td>
                                <td>{{this.bankname}}</td>
                            </tr>
                            <tr>
                                <td>借记卡账号</td>
                                <td>{{this.idcard}}</td>
                            </tr>
                        </tbody>
                    </x-table>
                </div>

                <br>
                （以下无正文）
                <br>
                <span class="time">
                    {{this.year}}年&nbsp;&nbsp;{{this.month}}月&nbsp;&nbsp;{{this.date}}日
                </span>
                <br><br><br>

            </div>
        </div>

    </div>
</template>

<script>
  import Services from '../../common/js/services'
  import _request from '../../common/js/request'
  import { XTable } from 'vux'

  export default {
    mixins: [_request],
    name: 'authprotocal',
    data () {
      return {
        profile: {
          'phone': '18600557240',
          'idcard_name': '黄志华',
          'idcard': '360681198902222614',
          'bankcard': [{
            'sysno': 93,
            'user_id': 77,
            'card_no': '6226134672794',
            'bank_name': '工商银行',
            'open_bank': '',
            'id_name': '黄志华',
            'mobile': '',
            'status': 1,
            'created_at': '2017-06-20 17:30:27',
            'updated_at': null,
            'is_safe_card': 0
          }],
          'nickname': '果子',
          'headimgurl': 'http://wx.qlogo.cn/mmopen/iaC0U6ltCLsQEqtesEdOnbAWApUNhGBM67NFEpQLvK5nYaxH7ZxQCX7mnl3JsT233DUqIWUWQpJtlsf92WaUmwqnJGCllVYp8/0',
          'status': 10,
          'status_name': '已实名'
        },
        bankname: '',
        name: '',
        idcard: '',
        year: '',
        month: '',
        date: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.name = vm.$route.query.name
        vm.idcard = vm.$route.query.idcard
        vm.bankname = vm.$route.query.bankname
        var date = new Date()
        vm.year = date.getFullYear()
        vm.month = date.getMonth()
        vm.date = date.getDate()
        vm.getProfile()
      })
    },
    filters: {
      toFixed (num, precision) {
        return parseFloat(num).toFixed(precision)
      }
    },
    created () {
      // this.getProfile()
    },
    methods: {
      getProfile () {
        this.requestPost(Services.myProfile, {}, (remoteData) => {
          this.profile = remoteData.data
        })
      }
    },
    components: {
      XTable
    }
  }
</script>

<style lang="less">
    @import '../../assets/css/iconfont.css';
    @import '~vux/src/styles/reset.less';
    @import '../../assets/less/base.less';

    .authprotocal {
        font-size: 15px;
        padding: 10px;
        .num {
            display: inline-block;
            min-width: 30px;
            border-bottom: 1px solid;
            line-height: 1;
        }
        .time {
            float: right
        }
        .table-wrap{
            padding: 15px
        }
    }

</style>
