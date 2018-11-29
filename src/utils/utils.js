import React from 'react'
import {Select} from 'antd'
const Option = Select.Option;
export default {
  /**
   * 格式化 年月日时分秒
   */
  formatDate (time) {
    if(!time) return '';
    let date = new Date(time);
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  },
  /**
   * 分页
   */
  pagination(data, callback) {
    let page = {
      onChange:(current)=>{
        callback(current)
      },
      current: data.result.page,
      pageSize:data.result.page_size,
      total:data.result.total_count,
      showTotal: ()=>{
        return `一共${data.result.total_count}条数据`
      },
      showQuickJumper: true
    }
    return page;
  },
  /**
   * select的options
   */
  getOptionList(data) {
    if(!data) return [];
    let options = [];
    data.map((item)=>{
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options;
  },
  /**
   * ETable 行点击通用函数
   * @param {*选中行的索引} selectedRowKeys
   * @param {*选中行对象} selectedItem
   */
  updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      })
    }
  },
}