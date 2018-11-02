import React from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from '../../../axios'
import Utils from "../../../utils/utils";

export default class BasicTable extends React.Component{
  state={}
  params = {
    page:1
  }
  componentDidMount() {
    const dataSource = [
      {
        id:'0',
        username:'Jack',
        sex:'1',
        state: '1',
        interest: '1',
        birthday: '2000-01-02',
        address: '北京市森林公园独立的精神',
        time: '09:00',
      },{
        id:'1',
        username:'Tom',
        sex:'1',
        state: '1',
        interest: '1',
        birthday: '2000-01-02',
        address: '北京市森林公园独立的精神',
        time: '09:00',
      },{
        id:'2',
        username:'Lily',
        sex:'1',
        state: '1',
        interest: '1',
        birthday: '2000-01-02',
        address: '北京市森林公园独立的精神',
        time: '09:00',
      },{
        id:'3',
        username:'Keke',
        sex:'1',
        state: '1',
        interest: '1',
        birthday: '2000-01-02',
        address: '北京市森林公园独立的精神',
        time: '09:00',
      }
    ];

    dataSource.map((item, index)=>{
      item.key = index;
      return item;
    })

    this.setState({dataSource})

    this.request();
  }

  request = ()=>{
    axios.ajax({
      url:'/table/list1',
      data: {
        params: {
          page:this.params.page
        }
      }
    }).then((res)=>{
      if(res.code === 0) {
        res.result.list.map((item, index)=>{
          item.key = index;
          return item
        })

        this.setState({
          dataSource2: res.result.list,
          selectedRowKeys:[],
          selectedIds:[],
          pagination:Utils.pagination(res, (current)=>{
            this.params.page = current;
            this.request();
          })
        })
      }
    })
  }

  onRowClick=(record,index)=>{
    let selectKey = [index];
    Modal.info({
      title:'信息',
      content:`用户名：${record.username}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }

  handleDelete = ()=>{
    let ids = this.state.selectedIds;
    Modal.confirm({
      title:'删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
      onOk: ()=>{
        message.success('删除成功')
        this.request();
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男':'女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '凤凰浪子',
            '3': '北大才子',
            '4': '才子家人',
            '5': '哈哈哈哈',
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(a) {
          let config = {
            '1': '爬山',
            '2': '足球',
            '3': '篮球',
            '4': '踢球',
            '5': '米阿吧',
            '6': '麦霸',
            '7': '桌球',
            '8': '游泳',
          }
          return config[a];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      },
    ];
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={false}
          />
        </Card>
        <Card title="Mock-单选" style={{margin:'10px 0'}}>
          <Table
            rowSelection={{
              type:'radio',
              selectedRowKeys:this.state.selectedRowKeys
            }}
            onRow={(record,index)=>{
              return {
                onClick: ()=>{
                  this.onRowClick(record,index);
                }
              }
            }}
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={false}
          />
        </Card>
        <Card title="Mock-多选" style={{margin:'10px 0'}}>
          <Button style={{marginBottom:10}} onClick={this.handleDelete}>删除</Button>
          <Table
            rowSelection={{
              type:'checkbox',
              selectedRowKeys:this.state.selectedRowKeys,
              onChange:(selectedRowKeys, selectedRows)=>{
                let ids = [];
                selectedRows.map((item)=>{
                  return ids.push(item.id)
                })
                this.setState({
                  selectedRowKeys,
                  selectedIds: ids
                })
              }
            }}
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={false}
          />
        </Card>
        <Card title="Mock-分页表格" style={{margin:'10px 0'}}>
          <Table
            bordered
            dataSource={this.state.dataSource2}
            columns={columns}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}