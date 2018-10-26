import React from 'react'
import {Card, Button, notification} from 'antd'
import './ui.less'

export default class Notifications extends React.Component{
  openNotification=(type,dir)=>{
    if(dir) {
      notification.config({
        placement: dir
      })
    }
    notification[type]({
      message:'发工资饿了',
      description: '啥谷歌月死老的圣诞节会发生，圣诞节快乐发动机撒。青是小闹'
    });
  }
  render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>Success</Button>
          <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>Info</Button>
          <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}>Warning</Button>
          <Button type="primary" onClick={()=>this.openNotification('error','bottomRight')}>Error</Button>
        </Card>
      </div>
    );
  }
}