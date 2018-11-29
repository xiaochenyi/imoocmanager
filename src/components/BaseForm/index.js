import React from 'react'
import {Form, Input, Select, DatePicker, Button, Checkbox} from 'antd'
import Utils from '../../utils/utils'
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component{
  handleFilterSubmit=()=>{
    let fieldsValue = this.props.form.getFieldsValue();
    console.log(fieldsValue)
    this.props.filterSubmit(fieldsValue);
  }

  initFormList = ()=>{
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];
    formList.forEach((item, i)=>{
      let label = item.label;
      let field = item.field;
      let initialValue = item.initialValue || '';
      let placeholder = item.placeholder;
      let width = item.width;
      if(item.type == 'DATEPICKER'){
        const DATEPICKER = <FormItem label={label} key={field}>
          {
            getFieldDecorator(field)(
              <DatePicker showTime placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
        </FormItem>
        formItemList.push(DATEPICKER);
      }
      if(item.type == '时间查询'){
        const BEIGIN_TIME = <FormItem label="订单时间" key="begin_time">
          {
            getFieldDecorator('begin_time')(
              <DatePicker showTime placeholder="请选择开始时间" format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
        </FormItem>
        formItemList.push(BEIGIN_TIME);
        const END_TIME = <FormItem label="~" colon={false} key="end_time">
          {
            getFieldDecorator('end_time')(
              <DatePicker showTime placeholder="请选择结束时间" format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
        </FormItem>
        formItemList.push(END_TIME);
      }
      if(item.type == 'CHECKBOX'){
        const CHECKBOX = <FormItem label={label} key={field}>
          {
            getFieldDecorator(field,{
              valuePropName:'checked',
              initialValue // true or false
            })(
              <Checkbox>
                {label}
              </Checkbox>
            )
          }
        </FormItem>
        formItemList.push(CHECKBOX);
      }
      if(item.type == 'INPUT'){
        const INPUT = <FormItem label={label} key={field}>
          {
            getFieldDecorator(field,{
              initialValue
            })(
              <Input type="text" placeholder={placeholder}/>
            )
          }
        </FormItem>
        formItemList.push(INPUT);
      }
      if(item.type == 'SELECT'){
        const SELECT = <FormItem label={label} key={field}>
          {
            getFieldDecorator(field,{
              initialValue
            })(
              <Select
                style={{width}}
                placeholder={placeholder}
              >
                { Utils.getOptionList(item.list) }
              </Select>
            )
          }
        </FormItem>
        formItemList.push(SELECT);
      }
    })
    return formItemList;
  }
  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(FilterForm)