import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from "../utils/utils";

export default class Axios{
  static requestList(_this,url,params,isMock) {
    var data = {
      params
    }
    this.ajax({
      url,
      data,
      isMock
    }).then((res)=>{
      if(res && res.result) {
        let list = res.result.item_list.map((item, index)=>{
          item.key = index;
          return item;
        })
        _this.setState({
          list,
          pagination:Utils.pagination(res, (current)=>{
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  }

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

    let baseApi = '';
    if(options.isMock) {
      baseApi = 'https://www.easy-mock.com/mock/5bd15b6e7f2aec4f84b04f95/mockapi';
    } else {
      baseApi = '正式服务端的接口';
    }
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