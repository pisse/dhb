<template>
    <div id="app" class="contract">
        <div>
            <div>
                <div style="text-align:center;font-size:1.5rem;font-weight:bold;">放款委托服务协议</div>
                <br>
                委托人：{{profile.idcard_name}}（甲方）
                <br>
                身份证号码：{{profile.idcard}}
                <br><br>

                被委托人：上海华肖网络科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;（乙方）
                <br>
                法定代表人：李涛
                <br><br>

                根据国家有关协议方面的法律法规和规章，经甲、乙双方协议一致达成以下协议：
                <br>
                一、甲方自愿将人民币￥ <span class="num">{{detail.invest_amount}}</span>元，大写（{{detail.invest_amount | toBig}}圆），
                委托乙方代替寻找用款人，因出借资金而获取的相关款项金额为 <span class="num">{{detail.interest}}</span>元，
                预期年利率<span class="num">{{detail.interest_rate | toFixed(2)}}</span>%(365天)。
                <br><br>
                二、甲方的权利和义务
                <br>
                1、甲方必须保证资金来源的合法性、真实性。
                <br>
                2、甲方有权要求乙方对自己的资金继续使用和寻找用款人的权利。
                <br>
                3、甲方需保证协议的有效性，如有特殊情况，必须提前抽出资金时，应提前15天提出书面申请，对应债权到期后退出。
                <br>
                4、甲方委托乙方办理委托放款后，有权获得因出借资金而获取的相关款项；乙方有义务保障甲方该项权利的实现。
                <br><br>
                三、乙方的权利和义务
                <br>
                1、有权为甲方寻找出借人。
                <br>
                2、为甲方保密，保证资金安全，并负有赔偿义务。
                <br>
                3、乙方为甲方做好服务，收取相关费用。
                <br>
                4、甲方委托乙方办理的委托放款期满后，有权收回委托的全部本金，乙方要保证甲方上述权利的实现。
                <br><br>
                四、其他约定
                <br>
                本协议有效期为起始计息日至预计还款日，有效期满后，对应债权退出，甲方可以继续预约放款或提现。
                <br><br>
                起始计息日：{{detail.interest_begin_date}}
                <br>
                预计还款日：{{detail.invest_end_date}}
                <br><br>
                （以下无正文）
                <br>

                <p class="sign">
                    甲方：{{profile.idcard_name}}&nbsp;&nbsp;&nbsp;
                    <br>身份证号：{{profile.idcard}}
                    <br>帐（卡）号：   {{profile.bankcard && profile.bankcard[0] && profile.bankcard[0]['card_no'] || ''}}

                    <br><br>
                    乙方：上海华肖网络科技有限公司&nbsp;&nbsp;&nbsp;
                    <br>
                    授权代表：李涛
                    <br>
                    <br>签订日期：{{detail.interest_begin_date}}
                    <br>
                    <br>
                    <span class="stamp"></span>
                </p>
                <br>

                <!--<div style="text-align:center;font-size:1.5rem;font-weight:bold;">用户服务协议</div>
                （本协议由甲、乙双方&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日签订于上海市崇明区）
<br>甲方（平台用户）：{{profile.idcard_name}}<br>身份证号码：{{profile.idcard}}<br><br>乙方：上海华肖网络科技有限公司<br>
                <br>上海华肖网络科技有限公司在此郑重提示您，本文系您与乙方之间的法律协议，请您认真阅读并理解本协议。本协议在您和乙方之间具有法律约束力。
<br>本协议适用于乙方所运营“华肖科技”平台“{{detail.invest_title}}”。<br>
                <br>第一条&nbsp;&nbsp;甲方认购详情<br>1.1甲方同意按照下列约定认购本项目<br>认购本金金额：<br>预期年化收益：{{detail.interest | toFixed(2)}}
<br>锁定期限：{{invest_date}}天<br>锁定期限起始日：{{detail.interest_begin_date}}<br>锁定期限届满日：{{detail.invest_end_date}}<br>1.2还款方式：{{detail.return_type}}。<br>
<br><br>第二条&nbsp;&nbsp;本项目详情<br>2.1&nbsp;甲方认购本项目金额将用于出借/受让乙方所运营的互联网金融信息服务平台“华肖科技”
&lt;!&ndash;（www.dahubao.com）&ndash;&gt;上的借款项目（包含原始借款项目及债权转让项目，以下简称借款项目）。<br>2.2&nbsp;甲方认购本项目金额仅向经乙方提供信息中介服务的借款项目进行出借/受让。<br>
                <br>第三条&nbsp;&nbsp;交易授权<br>3.1&nbsp;甲方在此不可撤销地授权乙方，自其认购本项目之日起，乙方有权通过乙方平台系统对于甲方认购本项目金额与借款项目间进行自动匹配，
                代为执行出借/债权受让/债权出让操作等。<br>3.2&nbsp;甲方在此不可撤销地授权乙方，自其认购本项目之日起，
                乙方有权将其资金（包括初始本金及已终结借款项目的本息金额）通过乙方平台系统执行出借/受让操作。<br>
                3.3&nbsp;甲方在此不可撤销地授权乙方，自其认购本项目之日起，乙方有权代其签署借款项目项下的电子合同，收付、划扣相关款项。<br>
                <br>第四条&nbsp;&nbsp;乙方服务费<br>甲方退出本项目时所出借/受让的借款项目实际综合利率/债权出让溢价率如高于本协议第一条约定的本项目预期年化收益率的，就高于部分作为乙方平台之服务费用。除此之外乙方不就向甲方提供本协议项下服务另行收取任何费用。<br><br>第五条&nbsp;&nbsp;甲方的退出<br>5.1本项目是由乙方系统实时成功匹配的各类借款项目集合。<br>本项目锁定期限届满，除本项目对应的原始借款项目自然终止外，本项目的退出均以出借人债权转让方式实现。<br>本项目锁定期限届满，除本项目对应的原始借款项目自然终止外，甲方所持有债权及其对应的本项目份额成功退出以后续出借人的债权受让为前提。<br>5.2&nbsp;被转让债权的债权受让人以下列规则排列先后顺序：<br>甲方申请转让债权时被转让债权对应的借款项目所在的平台项目中已存的出借人；<br>甲方申请转让债权时其他平台项目中已存的出借人；<br>甲方申请转让债权时新加入平台项目的出借人。<br>5.3&nbsp;甲方成功退出本项目的，甲方投资本金、收益将直接提取至甲方“华肖科技”账户余额中，甲方可自行支配、使用。<br>5.4&nbsp;本服务协议项下之借款项目如出现借款人提前还款之情形的，则本服务协议提前终止，甲方收益按照本协议约定的收益率及甲方持有本项目项下债权的实际期限计算。<br><br>第六条&nbsp;&nbsp;逾期处理<br>6.1&nbsp;借款项目约定还款日24:00时前借款人未能足额履行还本付息义务的，视为该借款项目逾期。<br>6.2&nbsp;如第三方机构按照同乙方间约定就逾期借款项目承担逾期垫付责任的，垫付方就逾期垫付的范围内受让相应的债权份额及其对应的其他合同权利。<br>&lt;!&ndash;6.3&nbsp;本项目适用“华肖科技”平台“招商银行千万质保服务专款”。如借款项目借款人出现逾期还款情形且第三方未予逾期垫付的，甲方因投资本项目所遭受之损失将由乙方平台质保服务专款先行垫付。<br>甲方接受乙方平台质保服务专款先行垫付的，乙方即在质保服务专款垫付的范围内受让甲方所持有的债权份额及其所对应的其他合同权利。<br>&ndash;&gt;6.3&nbsp;甲方在此不可撤销地授权乙方，自借款项目借款人出现逾期还款之日起，乙方有权以乙方自身名义代为甲方就逾期还款事项通过包含但不限于提起诉讼、仲裁，处置抵押物、质押物，申请人民法院强制执行以及同借款人达成和解等方式主张权利。由此所收回之款项优先受偿甲方之投资本息。<br><br>第七条&nbsp;&nbsp;各方承诺<br>7.1&nbsp;本协议双方在此确认均为具有完全民事权利能力及民事行为能力的自然人、法人或其他民事主体，有权签订并履行本协议。<br>7.2&nbsp;甲方承诺其出借/债权受让资金来源合法，甲方是该资金的合法所有人。如因第三方对于资金归属、合法性问题发生争议，由甲方自行解决。因甲方资金来源不合法造成乙方或/及第三方损失的，甲方需承担损害赔偿责任。<br>7.3&nbsp;甲方应自行承担并缴付因认购本项目所获收益的应纳税额。<br><br>第八条&nbsp;&nbsp;关于电子合同<br>8.1本协议采用电子文本形式制成，并在乙方及第三方网站上保留存档。其签订方式符合《中华人民共和国电子签名法》的要求。
                甲方通过电子签名形式确认或以其他方式选择接受本协议，即表示同意接受本协议的全部内容以及与本协议有关的各项规则。本协议各方均不得以本协议采取电子形式而否认本协议的法律效力。
<br>8.2甲方应当妥善保管自己的账号密码等账户信息，不得以账户信息被盗用或其他理由否认已订立的协议的效力或不履行相关义务。<br><br>第九条&nbsp;&nbsp;联系信息更新<br>
                本协议存续期间甲方本人姓名、身份证号码、手机号码、银行账户等信息如发生变更，应当在相关信息发生变更之日起三日内将更新后的信息提供给乙方。
                若甲方不及时提供上述变更信息而带来的损失或额外费用应由甲方承担。<br><br>第十条&nbsp;&nbsp;适用法律及争议解决<br>
                10.1本协议的签订、履行、终止、解释均适用中华人民共和国法律。<br>10.2因履行本协议所产生的争议应当通过友好协商解决；
                如协商不成，则本协议任意一方均可向乙方住所地上海市崇明区有管辖权的人民法院提起诉讼。<br><br>第十一条&nbsp;&nbsp;其他<br>
                11.1本协议未尽事项按照乙方平台现有及不时发布的平台各项规则执行。<br>11.2如本协议中的任何一条或多条被确认为无效，该无效条款并不影响本协议其他条款的效力。<br><br>

                <p class="sign">
                    甲方：{{profile.idcard_name}}&nbsp;&nbsp;&nbsp;
                    <br>签订日期：{{detail.interest_begin_date}}<br>

                    <br>
                    乙方：上海华肖网络科技有限公司&nbsp;&nbsp;&nbsp;
                    <br>签订日期：{{detail.interest_begin_date}}
                    <br>
                    <br>
                    <span class="stamp"></span>
                </p>-->
            </div>
        </div>

    </div>
</template>

<script>
  import Services from '../common/js/services'
  import _request from '../common/js/request'

  export default {
    mixins: [_request],
    name: 'contract',
    data () {
      return {
        detail: {},
        profile: {}
      }
    },
    computed: {
      invest_date () {
        let dateEnd = new Date(this.detail.invest_end_date)
        let dateStart = new Date(this.detail.interest_begin_date)
        if (dateEnd && dateStart) {
          return (dateEnd.getTime() - dateStart.getTime()) / (60 * 60 * 1000 * 24)
        }
      }
    },
    filters: {
      toFixed (num, precision) {
        return parseFloat(num).toFixed(precision)
      },
      toBig (num) {
        num = num + ''
        for (var i = num.length - 1; i >= 0; i--) {
          num = num.replace(',', '')// 替换num中的“,”
          num = num.replace(' ', '')// 替换num中的空格
        }
        if (isNaN(num)) { // 验证输入的字符是否为数字
          // alert('请检查小写金额是否正确')
          return
        }
        // 字符处理完毕后开始转换，采用前后两部分分别转换
        var part = String(num).split('.')
        var newchar = ''
        // 小数点前进行转化
        for (i = part[0].length - 1; i >= 0; i--) {
          if (part[0].length > 10) {
            // alert('位数过大，无法计算')
            return ''
          }// 若数量超过拾亿单位，提示
          var tmpnewchar = ''
          var perchar = part[0].charAt(i)
          switch (perchar) {
            case '0': tmpnewchar = '零' + tmpnewchar
              break
            case '1': tmpnewchar = '壹' + tmpnewchar
              break
            case '2': tmpnewchar = '贰' + tmpnewchar
              break
            case '3': tmpnewchar = '叁' + tmpnewchar
              break
            case '4': tmpnewchar = '肆' + tmpnewchar
              break
            case '5': tmpnewchar = '伍' + tmpnewchar
              break
            case '6': tmpnewchar = '陆' + tmpnewchar
              break
            case '7': tmpnewchar = '柒' + tmpnewchar
              break
            case '8': tmpnewchar = '捌' + tmpnewchar
              break
            case '9': tmpnewchar = '玖' + tmpnewchar
              break
          }
          switch (part[0].length - i - 1) {
            case 0:
              break
            case 1: if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
              break
            case 2: if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
              break
            case 3: if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
              break
            case 4: tmpnewchar = tmpnewchar + '万'
              break
            case 5: if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
              break
            case 6: if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
              break
            case 7: if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
              break
            case 8:
              tmpnewchar = tmpnewchar + '億'
              break
            case 9:
              tmpnewchar = tmpnewchar + '拾'
              break
          }
          newchar = tmpnewchar + newchar
        }
        // 替换所有无用汉字，直到没有此类无用的数字为止
        while (newchar.search('零零') != -1 || newchar.search('零億') != -1 || newchar.search('億万') != -1 || newchar.search('零万') != -1) {
          newchar = newchar.replace('零億', '億')
          newchar = newchar.replace('億万', '億')
          newchar = newchar.replace('零万', '万')
          newchar = newchar.replace('零零', '零')
        }
        // 替换以“一十”开头的，为“十”
        if (newchar.indexOf('壹拾') == 0) {
          newchar = newchar.substr(1)
        }
        // 替换以“零”结尾的，为“”
        if (newchar.lastIndexOf('零') == newchar.length - 1) {
          newchar = newchar.substr(0, newchar.length - 1)
        }
        return newchar
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.detail = vm.$router.app.data || {}
        vm.getProfile()
      })
    },
    methods: {
      getProfile () {
        this.requestPost(Services.myProfile, {
        }, (remoteData) => {
          this.profile = remoteData.data
        })
      }
    },
    components: {
    }
  }
</script>

<style lang="less">
    @import '../assets/css/iconfont.css';
    @import '~vux/src/styles/reset.less';
    @import '../assets/less/base.less';

    .contract {
        font-size: 15px;
        padding: 10px;
        .num{
            display: inline-block;
            min-width: 30px;
            border-bottom: 1px solid ;
            line-height: 1;
        }
        .sign{
            margin-left: 80px;
            position: relative;
            .stamp{
                top: 20px;
                left: 60px;
                display: inline-block;
                position: absolute;
                width: 100px;
                height: 100px;
                background-image: url('../assets/imgs/company.png');
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
    }

</style>
