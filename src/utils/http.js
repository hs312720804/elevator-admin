/**
 * 封装请求
 */

//引入axios
import axios from 'axios'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
// axios.interceptors.request.use(config => {
//     //发起请求时，取消掉当前正在进行的相同请求
//     if (promiseArr[config.url]) {
//         promiseArr[config.url]('操作取消')
//         promiseArr[config.url] = cancel
//     } else {
//         promiseArr[config.url] = cancel
//     }
//       return config
// }, error => {
//     return Promise.reject(error)
// })

// //响应拦截器即异常处理
// axios.interceptors.response.use(response => {
//   if (response.status === 200) {   
//     return Promise.resolve(response);  
//   } else {   
//     return Promise.reject(response);  
//   } 
// }, err => { // 服务器状态码不是200的情况 
//     if (err && err.response) {
//       switch (err.response.status) {
//         case 400:
//           err.message = '错误请求'
//           break;
//         case 401:
//           err.message = '未授权，请重新登录'
//           break;
//         case 403:
//           err.message = '拒绝访问'
//           break;
//         case 404:
//           err.message = '请求错误,未找到该资源'
//           break;
//         case 405:
//           err.message = '请求方法未允许'
//           break;
//         case 408:
//           err.message = '请求超时'
//           break;
//         case 500:
//           err.message = '服务器端出错'
//           break;
//         case 501:
//           err.message = '网络未实现'
//           break;
//         case 502:
//           err.message = '网络错误'
//           break;
//         case 503:
//           err.message = '服务不可用'
//           break;
//         case 504:
//           err.message = '网络超时'
//           break;
//         case 505:
//           err.message = 'http版本不支持该请求'
//           break;
//         default:
//           err.message = `连接错误${err.response.status}`
//       }
//     } else {
//       err.message = "连接到服务器失败"
//     }
//     message.err(err.message)
//       return Promise.resolve(err.response)
// })

let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol
// axios.defaults.baseURL = '/api'

// 环境的切换
if (process.env.NODE_ENV == 'development') { 
  axios.defaults.baseURL = `${protocol}//iot.gidomino.com/gi-api`
 } else if (process.env.NODE_ENV == 'debug') { 
  axios.defaults.baseURL = '';
 } else if (process.env.NODE_ENV == 'production') { 
  axios.defaults.baseURL = `${protocol}//iot.gidomino.com/gi-api`
 }

//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Token': window.localStorage.getItem('accessToken')
}
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 
axios.defaults.timeout = 10000

export default {
  //get请求
    get (url,param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'get',
          url,
          params: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        }).catch(err => {   
          reject(err.data)  
        }) 
      })
    },
  //post请求
    post (url,param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'post',
          url,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        }).catch(err => {   
          reject(err.data)  
        }) 
      })
     }
  }
