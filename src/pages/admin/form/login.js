import React from 'react'
import {Card, Form, Input, Button, message, Icon, Checkbox} from 'antd'

const FormItem = Form.Item;

class FormLogin extends React.Component{
  handleSubmit = () =>{
    let userInfo = this.props.form.getFieldsValue();
    console.log(userInfo)

    this.props.form.validateFields((err,values)=>{
      if(!err) {
        message.success(`${userInfo.username} 恭喜你，您通过了本次表单组件学习，当前密码为：${userInfo.userPwd}`);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="内联表单(行内表单)">
          <Form layout="inline">
            <FormItem label="用户名">
              <Input placeholder="请输入用户名"/>
            </FormItem>
            <FormItem label="密码">
              <Input placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
            <FormItem>
              <Button type="primary">重置</Button>
            </FormItem>
          </Form>
        </Card>

        <Card title="登录水平表单" style={{marginTop:10}}>
          <Form style={{width:300}}>
            <FormItem>
              {
                getFieldDecorator('username',{
                  initialValue:'',
                  rules:[
                    {
                      required:true,
                      message:'用户名不能为空'
                    },{
                      min:5,max:10,
                      message:'长度不在范围内'
                    },{
                      pattern: /^\w+$/g,//new RegExp('^\\w+$','g')
                      message:'用户名必须为英文字母或数字'
                    }
                  ]
                })(
                  <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('userPwd')(
                  <Input  prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remenber',{
                  valuePropName: 'checked',
                  initialValue:false
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="/#" style={{float:'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>登录</Button>
              <Button type="primary" style={{float:'right'}}>重置</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormLogin)