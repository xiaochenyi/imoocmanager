import React from 'react'
import {Card, Form, Button, Input, InputNumber, Checkbox, Radio, Select, Switch, DatePicker, TimePicker,Upload, Icon,  Modal} from 'antd'
import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;


class FormRegisiter extends React.Component{
  state = {
    loading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }],
  };

  handleCancel = ()=> this.setState({previewVisible:false})

  handlePreview = (file)=> {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList })=> {
    console.log(fileList);
    this.setState({fileList})
  }

  handleSubmit=()=>{
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values)=>{
      if(err){
        console.log(values)
      }
    })

  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24, //<576
        sm: 4 // >=576
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayout = {
      wrapperCol:{
        xs:24,
        sm:{
          span:12,offset:4
        }
      }
    }
    const rowObject={ minRows: 4, maxRows: 6};

    const {previewVisible, previewImage, fileList} = this.state;
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [{
                    required: true,
                    message: '用户名不能为空'
                  }]
                })(
                  <Input placeholder="请输入用户名"/>
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [{
                    required: true,
                    message: '密码不能为空'
                  }]
                })(
                  <Input placeholder="请输入密码"/>
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </Radio.Group>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: '18',
                })(
                  <InputNumber></InputNumber>
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '2',
                })(
                  <Select>
                    <Option value="1">先于一体</Option>
                    <Option value="2">风华杭州</Option>
                    <Option value="3">百度FE</Option>
                    <Option value="4">回到家打开手机</Option>
                    <Option value="5">创业者家</Option>
                    <Option value="6">对对方的</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['3','4','6'],
                })(
                  <Select mode="multiple">
                    <Option value="1">游泳</Option>
                    <Option value="2">打篮球</Option>
                    <Option value="3">踢足球</Option>
                    <Option value="4">跑步</Option>
                    <Option value="5">爬山</Option>
                    <Option value="6">骑行</Option>
                    <Option value="7">麦霸</Option>
                    <Option value="8">桌球</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue:true
                })(
                  <Switch/>
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday',{
                  initialValue:moment('2018-08-08 12:00:09')
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:MM:SS"
                  />
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address',{
                  initialValue:'dfdsafd'
                })(
                  <TextArea autosize={rowObject}/>
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time')(
                  <TimePicker/>
                )
              }
            </FormItem>
            <FormItem label="测试上传列表" {...formItemLayout}>
              {
                getFieldDecorator('listImg',{
                  initialValue: fileList
                })(
                  <div>
                    <Upload
                      mode="multiple"
                      listType="picture-card"
                      action="http://172.16.100.110:3001/videotest/add"
                      fileList={fileList}
                      onChange={this.handleChange}
                      onPreview={this.handlePreview}
                    >
                      {fileList.length >= 3 ? null : <Icon type="plus"/>}
                    </Upload>
                    <Modal title="预览" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                )
              }
            </FormItem>
            <FormItem  {...offsetLayout}>
              {
                getFieldDecorator('agree')(
                  <Checkbox>我已阅读过<a href="/a">多少熄灯睡觉啊饭</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem  {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormRegisiter);

