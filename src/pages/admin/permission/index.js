import React from 'react'
import { Card, Button } from 'antd'
import ETable from "../../../components/ETable";
import Utils from '../../../utils/utils'
import axios from '../../../axios'

export default class PermissionUser extends React.Component{
  state = {}

  componentWillMount() {

  }

  render(){
    const columns = [
      {
        title:'角色ID',
        dataIndex: 'id'
      },{
        title: '角色名称',
        dataIndex: 'role_name'
      },{
        title:'创建时间',
        dataIndex: 'create_time'
      },{
        title:'使用状态',
        dataIndex: 'status'
      },{
        title:'授权时间',
        dataIndex:'authorize_time',
        render: Utils.formatDate
      },{
        title:'授权人',
        dataIndex:'authorize_user_name'
      }
    ]
    return(
      <div>
        <Card>
          <Button type="primary">创建角色</Button>
          <Button type="primary" style={{marginLeft:10,marginRight:10}}>设置权限</Button>
          <Button type="primary">用户授权</Button>
        </Card>

        <div className="content-wrap">
          <ETable
            columns={columns}
          />
        </div>
      </div>
    );
  }
}