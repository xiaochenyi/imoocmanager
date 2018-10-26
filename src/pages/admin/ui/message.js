import React from 'react'
import {Card, Button, message} from 'antd'
import './ui.less'

export default class Message extends React.Component{
  showMessage=(type,msg)=>{
    message[type](msg);
  }
  render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button type="primary" onClick={()=>this.showMessage('success','dasfds')}>Success</Button>
          <Button type="primary" onClick={()=>this.showMessage('info','dsafds')}>Info</Button>
          <Button type="primary" onClick={()=>this.showMessage('warning','dddd')}>Warning</Button>
          <Button type="primary" onClick={()=>this.showMessage('error')}>Error</Button>
          <Button type="primary" onClick={()=>this.showMessage('loading')}>Loading</Button>
        </Card>
      </div>
    );
  }
}