import React from 'react'
import {Card, Button, Modal, Form, Input, Radio, Select, DatePicker, message} from 'antd'
import axios from '../../../axios'
import Utils from '../../../utils/utils'
import BaseForm from '../../../components/BaseForm'
import ETable from '../../../components/ETable'
import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends React.Component{
  state = {
    isVisible:false
  }

  params = {
    page:1
  }

  formList = [
    {
      type:'INPUT',
      label:'用户名',
      field:'user_name',
      placeholder:'请输入用户名',
      width:80
    },
    {
      type:'INPUT',
      label:'手机号',
      field:'user_mobile',
      placeholder:'请输入手机号',
      width:80
    },
    {
      type:'DATEPICKER',
      label:'入职时间',
      field:'user_date',
      placeholder:'请选择入职日期'
    }
  ];

  componentDidMount() {
    this.requestList();
  }

  handleOperate=(type)=>{
    const item = this.state.selectedItem;
    if(type == 'create') {
      this.setState({
        type,
        isVisible:true,
        title:'创建员工',
        userInfo:{}
      })
    } else if(type == 'edit') {
      if(!item) {
        Modal.info({
          title:'提示',
          content:'请先选择一条员工信息'
        })
        return;
      }
      this.setState({
        type,
        isVisible:true,
        title:'编辑员工',
        userInfo: item
      })
    } else if(type == 'detail') {
      if(!item) {
        Modal.info({
          title:'提示',
          content:'请先选择一条员工信息'
        })
        return;
      }
      this.setState({
        type,
        isVisible:true,
        title:'员工详情',
        userInfo: item
      })
    } else if(type == 'delete') {
      if(!item) {
        Modal.info({
          title:'提示',
          content:'请先选择一条员工信息'
        })
        return;
      }
      Modal.confirm({
        title:'确认删除',
        content:'请确认是否删除当前选择这条员工',
        onOk:()=>{
          axios.ajax({
            isMock:true,
            url:'/user/delete',
            data:{
              params: {
                id:item.id
              }
            }
          }).then((res)=>{
            if(res.code == 0) {
              message.success("删除成功")
            }
          })
        }
      })
    }
  }

  handleSubmit = ()=> {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();
    console.log(data)
    axios.ajax({
      isMock:true,
      url:type=='create' ? '/user/add':'/user/edit',
      data:{
        params:data
      }
    }).then((res)=>{
      if(res.code == 0) {
        this.userForm.props.form.resetFields();
        this.setState({
          isVisible:false,
          selectedItem: null,
          selectedRowKeys:null
        })
        this.requestList();
      }
    });
  }


  handleFilter = (params)=>{
    this.params = params;
    this.requestList();
  }

  requestList = ()=>{
    axios.requestList(this, '/user/list', this.params, true)
  }

  render() {
    let footer = {};
    if(this.state.type == 'detail') {
      footer = {
        footer: null
      }
    }
    const columns = [
      {
        title: 'id',
        dataIndex:'id'
      },
      {
        title: '用户名',
        dataIndex:'username'
      },
      {
        title: '性别',
        dataIndex:'sex',
        render(sex) {
          return sex==1?'男':'女'
        }
      },
      {
        title: '状态',
        dataIndex:'state',
        render(state) {
          return {
            '1':'咸鱼',
            '2':'dfsg',
            '3':'反倒是',
            '4':'接口',
            '5':'粉丝',
          }[state]
        }
      },
      {
        title: '爱好',
        dataIndex:'interest',
        render(interest) {
          return {
            '1':'反倒是',
            '2':'法棍',
            '3':'uu',
            '4':'888',
            '5':'通用',
            '6':'艺',
            '7':'应用',
            '8':'偷偷',
          }[interest]
        }
      },
      {
        title: '生日',
        dataIndex:'birthday'
      },
      {
        title: '联系地址',
        dataIndex:'address'
      },
      {
        title: '早起时间',
        dataIndex:'time'
      }

    ];
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}></BaseForm>
        </Card>

        <Card style={{marginTop:10}} className="operate-wrap">
          <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
          <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
          <Button type="primary" icon="delete" onClick={()=>this.handleOperate('delete')}>删除员工</Button>
        </Card>

        <div className="content-wrap">
          <ETable
            updateSelectedItem = { Utils.updateSelectedItem.bind(this) }
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            selectedRowKeys = {this.state.selectedRowKeys}
            selectedItem = {this.state.selectedItem}
          />
        </div>

        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={()=>{
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible:false
            })
          }}
          width={600}
          { ...footer }
        >
          <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(form) => this.userForm = form}></UserForm>
        </Modal>
      </div>
    )
  }
}

class UserForm extends React.Component{
  render() {
    const type = this.props.type;
    const userInfo = this.props.userInfo || {};
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:19}
    }
    return (
      <Form>
        <FormItem label="用户名" {...formItemLayout}>
          {
            type == 'detail' ? userInfo.username :
            getFieldDecorator('user_name',{
              initialValue: userInfo.username
            })(
              <Input type="text" placeholder="请输入用户名"/>
            )
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            type == 'detail' ? userInfo.sex == 1 ? '男':'女' :
            getFieldDecorator('sex',{
              initialValue: userInfo.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            type == 'detail' ? userInfo.state :
            getFieldDecorator('state',{
              initialValue: userInfo.state
            })(
              <Select>
                <Option value={1}>咸鱼一条</Option>
                <Option value={2}>风华浪子</Option>
                <Option value={3}>北大才子</Option>
                <Option value={4}>百度FE</Option>
                <Option value={5}>创业者</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {
            type == 'detail' ? userInfo.birthday :
            getFieldDecorator('birthday',{
              initialValue: moment(userInfo.birthday)
            })(
              <DatePicker/>
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {
            type == 'detail' ? userInfo.address :
            getFieldDecorator('address',{
              initialValue: userInfo.address
            })(
              <TextArea row={3} placeholder="请输入联系地址"/>
            )
          }
        </FormItem>
      </Form>
    );
  }
}

UserForm = Form.create({})(UserForm);
