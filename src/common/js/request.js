/**
 * Created by Administrator on 2017/5/7.
 */
import Vue from 'vue'
import { LoadingPlugin, TransferDomDirective as TransferDom } from 'vux'
Vue.use(LoadingPlugin)
import Service from './services'

let Request = {
  data () {
    return {
      isLoading: false,
      showToast: false,
      msg: '',
      isWxLogining: false
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    requestPost (url, data, callback) {
      Vue.http.options.emulateJSON = true
      this.isLoading = true
      return this.$http.post(url, data, {
        credentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        res = res.json()
        return res
      }).then((remoteData) => {
        this.isLoading = false
        if (remoteData.code === -10000) {
          this.wxLogin()
        }
        if (remoteData.code === 0) {
          callback.call(this, remoteData)
        } else {
          this.showToast = true
          this.msg = remoteData.msg || remoteData.message
        }
      })
    },
    request (url, data, callback, loadingKey) {
      this.isLoading = true
      this.$http.jsonp(url, {
        params: data
      }).then((res) => {
        res = res.json()
        return res
      }).then((remoteData) => {
        this.isLoading = false
        if (remoteData.code === -10000) {
          this.wxLogin()
        }
        if (remoteData.code === 0) {
          callback.call(this, remoteData)
        } else {
          this.showToast = true
          this.msg = remoteData.msg
        }
      })
    },
    wxLogin () {
      if (!this.isWxLogining) {
        location.href = Service.wxLogin + '?returnurl=' + location.href
        this.isWxLogining = true
      }

      /* return this.$http.post(Service.wxLogin, {}, {
        credentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        res = res.json()
        return res
      }).then((remoteData) => {
        location.href = './index.html'
      }) */
    }
  }
}

export default Request
