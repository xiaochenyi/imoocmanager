import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'

export default class Axios{
  static jsonp(options) {
    return new Promise((resolve, reject)=>{
      JsonP(options.url,{
        param: 'callback'
      },function (err,res) {
        if(res.status === 'success') {
          resolve(res)
        }else{
          reject(res.message)
        }
      })
    })
  }

  static ajax(options) {
    let loading;
    if(options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = "block";
    }
    // let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    let baseApi = 'https://www.easy-mock.com/mock/5bd15b6e7f2aec4f84b04f95/mockapi';
    return new Promise((resolve, reject)=>{
      axios({
        url:options.url,
        method: 'get',
        baseURL: baseApi,
        timeout:50000,
        params:(options.data && options.data.params) || ''
      }).then((response)=>{
        if(options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = "none";
        }
        if(response.status === 200) {
          let res = response.data;
          if(res.code === 0) {
            resolve(res)
          } else {
            Modal.info({
              title:"提示",
              content:res.msg
            })
          }
        } else {
          reject(response.data)
        }
      }).catch((err)=>{
        // 404 请求超时
        if(options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = "none";
        }
        alert(err)
        // reject(err)
      })
    });
  }
}