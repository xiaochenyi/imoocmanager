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
  }
}