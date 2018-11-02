import React from 'react'
import { Card, Table, Modal, Button, message, Badge} from 'antd'
import axios from '../../../axios'

export default class HighTable extends React.Component{
  state={}
  params = {
    page:1
  }

  componentDidMount() {
    this.request()
  }
  handleChange = (pagination,filters,sorter)=>{
    console.log(sorter)
    this.setState({
      sortOrder:sorter.order
    })
  }
  handleDelete = (item)=>{
    let id = item.id;
    Modal.confirm({
      title:'确认',
      content:'您确认要删除此条数据吗？',
      onOk:()=>{
        message.success('删除成功');
        this.request();
      }
    })
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
          dataSource: res.result.list
        })
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width:80
      },
      {
        title: '用户名',
        dataIndex: 'username',
        width:80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width:80,
        render(sex) {
          return sex === 1 ? '男':'女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        width:80,
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
        width:80,
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
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        width:120,
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        width:80,
        dataIndex: 'time'
      },
    ];
    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        width:80,
        fixed:'left'
      },
      {
        title: '用户名',
        dataIndex: 'username',
        width:80,
        fixed:'left'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width:80,
        render(sex) {
          return sex === 1 ? '男':'女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        width:80,
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
        width:80,
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
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width:120,
        dataIndex: 'birthday'
      },

      {
        title: '地址',
        width:120,
        dataIndex: 'address',
        fixed:'right'
      },
      {
        title: '早起时间',
        width:80,
        dataIndex: 'time',
        fixed:'right'
      },
    ];
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男':'女'
        }
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter:(a, b)=>{
          return a.age - b.age;
        },
        sortOrder:this.state.sortOrder
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
    const columns4 = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男':'女'
        }
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter:(a, b)=>{
          return a.age - b.age;
        },
        sortOrder:this.state.sortOrder
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
            '1': <Badge status="success" text='成功'/>,
            '2': <Badge status="error" text='报错'/>,
            '3': <Badge status="default" text='正常'/>,
            '4': <Badge status="processing" text='进心中'/>,
            '5': <Badge status="warning" text='警告'/>,
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
        title: '操作',
        render:(text, item)=>{
          return <Button size="small" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
        }
      },
    ];
    return (
      <div>
        <Card title="头部固定">
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={false}
            scroll={{y:240}}
          />
        </Card>
        <Card title="左右固定" style={{margin:'10px 0'}}>
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns2}
            pagination={false}
            scroll={{x:3840}}
          />
        </Card>
        <Card title="表格排序" style={{margin:'10px 0'}}>
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns3}
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="操作按钮" style={{margin:'10px 0'}}>
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns4}
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}
