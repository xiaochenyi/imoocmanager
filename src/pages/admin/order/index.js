import React from 'react'
import { Card, Button, Table, Form, DatePicker, Select, Modal } from 'antd'
import axios from '../../../axios'
import Utils from '../../../utils/utils'

const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component{
  state={
    orderInfo:{},
    orderConfirmVisble:false
  }
  params = {
    page:1
  }
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  openOrderDetail=()=>{
    let item = this.state.selectedItem;
    if(!item) {
      Modal.info({
        title:'信息',
        content:'请先选择一条订单'
      })
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`, '_blank');
  }
  handleConfirm=()=>{
    let item = this.state.selectedItem;
    if(!item) {
      Modal.info({
        title:'信息',
        content:'请先选择一条订单'
      })
      return;
    }
    this.setState({
      orderInfo:item,
      orderConfirmVisble:true
    })
  }
  componentDidMount() {
    this.requestList()
  }
  requestList=()=>{
    axios.ajax({
      url:'/order/list',
      data:{
        params: {
          page:this.params.page
        }
      }
    }).then((res)=>{
      let list = res.result.item_list.map((item, index)=>{
        item.key = index;
        return item;
      })
      this.setState({
        list,
        pagination:Utils.pagination(res, (current)=>{
          this.params.page = current;
          this.requestList();
        })
      })
    })
  }
  render() {
    const columns = [
      {
        title:'订单编号',
        dataIndex: 'order_sn'
      },
      {
        title:'车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title:'用户名',
        dataIndex: 'user_name'
      },
      {
        title:'手机号码',
        dataIndex: 'mobile'
      },
      {
        title:'里程',
        dataIndex: 'distance'
      },
      {
        title:'行驶时长',
        dataIndex: 'total_time'
      },
      {
        title:'状态',
        dataIndex: 'status'
      },
      {
        title:'开始时间',
        dataIndex: 'start_time'
      },
      {
        title:'结束时间',
        dataIndex: 'end_time'
      },
      {
        title:'订单金额',
        dataIndex: 'total_fee'
      },
      {
        title:'实付金额',
        dataIndex: 'user_pay'
      }
    ]
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:19}
    }
    return (
      <div>
        <Card>
          <FilterForm/>
        </Card>

        <Card style={{marginTop:10}}>
          <Button type="primary" style={{marginRight:20}} onClick={this.openOrderDetail}>订单详情</Button>
          <Button type="primary" onClick={this.handleConfirm}>结束订单</Button>
        </Card>

        <div className="content-wrap">
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
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={()=>{
            this.setState({
              orderConfirmVisble:false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

class FilterForm extends React.Component {
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {
            getFieldDecorator('city_id')(
              <Select
                style={{width: 100}}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
                <Option value="3">深圳市</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label="订单时间">
          {
            getFieldDecorator('start_time')(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
        </FormItem>

        <FormItem label="~" colon={false}>
          {
            getFieldDecorator('start_time')(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
        </FormItem>

        <FormItem label="订单状态">
          {
            getFieldDecorator('status')(
              <Select
                style={{ width: 80 }}
                placeholder="全部"
              >
                <Option value="">全部</Option>
                <Option value="1">进行中</Option>
                <Option value="2">进行中（临时锁车）</Option>
                <Option value="3">行程结束</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>

      </Form>
    )
  }
}
FilterForm = Form.create({})(FilterForm);