/**
 * Created by Administrator on 2017/5/7.
 */
var Domain = 'https://m.dahubao.com/'
if (process.env.NODE_ENV === 'development') {
  Domain = 'http://100.omnibiz.cn/frontend/web/'
}

let Services = {
  // 用户
  login: Domain + 'home/login',
  loginOut: Domain + 'home/logout',
  register: Domain + 'home/register',

  // 首页
  userAsset: Domain + 'home/get-user-asset',
  totalEarn: Domain + 'home/get-total-earn',
  prodList: Domain + 'prod/list',

  // 详细页
  prodDetail: Domain + 'prod/detail',
  prodRecordsDetail: Domain + 'my/debt',
  order: Domain + 'my/order',

  // 我的
  isAuth: Domain + 'my/is-auth',
  myInvestList: Domain + 'my/my-invest',
  myTrade: Domain + 'my/my-trade',
  bindCard: Domain + 'my/bind-idcard',
  bindMobile: Domain + 'my/bind-phone',
  unbindCard: Domain + 'my/un-bind-bank-card',
  bindBankCard: Domain + 'my/bind-bank-card',
  myProfile: Domain + 'my/my-profile',
  newPwd: Domain + 'my/set-paypwd',
  wxLogin: Domain + 'wx/login',
  recharge: Domain + 'my/recharge',
  mention: Domain + 'my/mention'
}

export default Services
