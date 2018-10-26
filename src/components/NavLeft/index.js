import React from 'react'
import './index.less'
import { Menu } from 'antd'
import MenuConfig from '../../config/menuConfig'
import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu

export default class NavLeft extends React.Component{
  componentWillMount() {
    var menuTreeNode = this.renderMenu(MenuConfig);

    this.setState({
      menuTreeNode
    })
  }

  renderMenu = (data)=>{
    return data.map((item)=>{
      if(item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return <Menu.Item key={item.key}><Link to={item.key}>{item.title}</Link></Menu.Item>
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc MS</h1>
        </div>
        <Menu theme="dark">
          { this.state.menuTreeNode }
        </Menu>
      </div>
    );
  }
}