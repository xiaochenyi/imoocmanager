import React from 'react'
import {Row, Button, Card, Radio} from 'antd'
import './ui.less'

export default class Buttons extends React.Component{
  state = {
    loading: true,
    size: "default"
  }

  handleCloseLoading = ()=>{
    this.setState({
      loading: false
    });
  }

  handleChange = (e) => {
    this.setState({
      size: e.target.value
    })
  }

  render() {
    return (
      <Row>
        <Card title="基础按钮" className="card-wrap">
          <Button type="primary">Primary</Button>
          <Button>default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">删除</Button>
          <Button disabled>Imooc</Button>
        </Card>

        <Card title="图形按钮" className="card-wrap">
          <Button icon="plus">添加</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search"></Button>
          <Button type={"primary"} icon={"search"} >搜索</Button>
          <Button type={"primary"} icon={"download"} >下载</Button>
        </Card>

        <Card title="Loading按钮" className="card-wrap">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type={"primary"} shape={"circle"} loading={true}></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape={"circle"} loading={true}></Button>
          <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
        </Card>

        <Card title="按钮组" style={{marginBottom:"10px"}}>
          <Button.Group>
            <Button type={"primary"} icon={"left"}>后退</Button>
            <Button type={"primary"} icon={"right"}>前进</Button>
          </Button.Group>
        </Card>

        <Card title="按钮尺寸" className="card-wrap">
          <Radio.Group value={this.state.size} onChange={this.handleChange}>
            <Radio value={"large"}>大</Radio>
            <Radio value={"default"}>中</Radio>
            <Radio value={"small"}>小</Radio>
          </Radio.Group>
          <Button size={this.state.size} type="primary">Primary</Button>
          <Button size={this.state.size} >default</Button>
          <Button size={this.state.size}  type="dashed">Dashed</Button>
          <Button size={this.state.size} type="danger">删除</Button>
          <Button size={this.state.size} disabled>Imooc</Button>
        </Card>
      </Row>
    );
  }
}