import React from 'react'
import {Card, Tabs, message, Icon} from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane;

export default class Tab extends React.Component{
  componentWillMount() {
    const panes = [{
      content:'反倒是割发代首个黑得发亮三个阶段',
      tab:'tab等等乖巧',
      key:'1'
    },{
      content:'防护林带撒房价多少',
      tab:'tab第二个',
      key:'2'
    },{
      content:'不能随便写',
      tab:'tab三',
      key:'3'
    }];

    this.setState({
      panes,
      activeKey:panes[0].key
    });

    this.newTabIndex = 0;
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ tab: 'New Tab', content: `New Tab Pane${this.newTabIndex}`, key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  handleCallback = (k)=>{
    message.info("Hi,您选择了页签：" + k)
  };

  render() {

    return (
      <div>
        <Card title="Tab页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab="Tab1表情" key={1}>欢迎学习Reactre课程</TabPane>
            <TabPane tab="Tab12表情" key={2}>欢迎学习Reactrewt课程</TabPane>
            <TabPane tab="Tab13表情" key={3}>欢迎学习Reactrewtre课程</TabPane>
          </Tabs>
        </Card>

        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab={<span><Icon type="plus"/>Tttt</span>} key={1}>欢迎学习Reactre课程</TabPane>
            <TabPane tab={<span><Icon type="edit"/>Tttt</span>} key={2} disabled>欢迎学习Reactre课程</TabPane>
            <TabPane tab={<span><Icon type="delete"/>Tttt</span>} key={3}>欢迎学习Reactre课程</TabPane>
          </Tabs>
        </Card>

        <Card title="可编辑(增加删除)" className="card-wrap">
          <Tabs
            type="editable-card"
            onChange={this.onChange}
            onEdit={this.onEdit}
            activeKey={this.state.activeKey}
          >
            {
              this.state.panes.map((item)=>
                <TabPane tab={item.tab} key={item.key}>{item.content}</TabPane>
              )
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}