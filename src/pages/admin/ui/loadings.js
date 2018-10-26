import React from 'react'
import {Card, Icon, Row, Spin, Alert} from 'antd'
import './ui.less'

/**
 * 局部区域加载
 * 用于异步加载的提示效果
 * 缓解用户使用的焦虑
 * 1.indicator只能换静态图片 加上spinning={true}也不旋转
 * 2.type="loading"是一张gif图
 */
export default class Loadings extends React.Component{
  render() {
    var icon = <Icon type="plus"></Icon>
    var iconL = <Icon type="loading"></Icon>
    return (
      <Row>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small"/>
          <Spin style={{margin:'0 10px'}}/>
          <Spin size="large"/>
          <Spin size="large" indicator={icon} style={{marginLeft:10}} spinning={true}/>
          <Spin size="large" indicator={iconL} style={{marginLeft:10}}/>
        </Card>

        <Card title="内容遮罩" className="card-wrap">
          <Alert
            message="React"
            description="换对三顿饭都是快乐"
            type="info"
          />
          <Spin spinning={true}>
            <Alert
              message="React"
              description="换对三顿饭都是快乐"
              type="success"
            />
          </Spin>
          <Spin tip="正在加载，请稍后···">
            <Alert
              message="React"
              description="换对三顿饭都是快乐"
              type="warning"
            />
          </Spin>
          <Spin indicator={iconL} tip="正在加载，请稍后···">
            <Alert
              message="React"
              description="换对三顿饭都是快乐"
              type="error"
            />
          </Spin>
        </Card>
      </Row>
    );
  }
}