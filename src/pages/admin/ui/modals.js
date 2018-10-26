import React from 'react'
import {Card, Button, Modal} from 'antd'
import './ui.less'

export default class Modals extends React.Component{
  state={
    showModel1: false,
    showModel2: false,
    showModel3: false,
    showModel4: false
  }
  handleOpen = (type)=>{
    this.setState({
      [type]: true
    })
  }
  handleClose = (type)=>{
    this.setState({
      [type]: false
    })
  }
  handleConfirm=(type)=>{
    Modal[type]({
      title: '确认？',
      content: '你确定学会欧了React了吗？',
      onOk() {
        console.log('ok')
      },
      onCancel() {
        console.log('cancel')
      }
    })
  }

  render() {
    return (
      <div>
        <Card title={"基础模态框"} className="card-wrap">
          <Button type={"primary"} onClick={()=>this.handleOpen('showModel1')}>Open</Button>
          <Button type={"primary"} onClick={()=>this.handleOpen('showModel2')}>自定义页脚</Button>
          <Button type={"primary"} onClick={()=>this.handleOpen('showModel3')}>顶部20px弹框</Button>
          <Button type={"primary"} onClick={()=>this.handleOpen('showModel4')}>水平垂直居中</Button>
        </Card>

        <Card title={"信息确认框"} className="card-wrap">
          <Button type={"primary"} onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
          <Button type={"primary"} onClick={()=>this.handleConfirm('info')}>Info</Button>
          <Button type={"primary"} onClick={()=>this.handleConfirm('success')}>Success</Button>
          <Button type={"primary"} onClick={()=>this.handleConfirm('warning')}>Warning</Button>
        </Card>

        <Modal
          title="React"
          visible={this.state.showModel1}
          onCancel={()=>this.handleClose('showModel1')}
        >
          <p>欢迎来到的酸辣粉加大煞风景的开始</p>
        </Modal>

        <Modal
          title="React"
          visible={this.state.showModel2}
          okText="好的"
          cancelText="算了"
          onCancel={()=>this.handleClose('showModel2')}
        >
          <p>欢迎来到的酸辣粉加大煞风景的开始</p>
        </Modal>

        <Modal
          title="React"
          style={{top:"20px"}}
          visible={this.state.showModel3}
          onCancel={()=>this.handleClose('showModel3')}
        >
          <p>欢迎来到的酸辣粉加大煞风景的开始</p>
        </Modal>

        <Modal
          title={"React"}
          wrapClassName="vertical-center-modal"
          visible={this.state.showModel4}
          onCancel={()=>{this.handleClose('showModel4')}}
        >
          <p>欢迎来到的酸辣粉加大煞风景的开始</p>
        </Modal>
      </div>
    );
  }
}