import React from 'react'
import {Card, Row, Col, Modal} from 'antd'
import './ui.less'

export default class Gallery extends React.Component{
  componentWillMount() {
    const imgSrc = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png'],
    ];
    const imgList = imgSrc.map((arr) => arr.map((src) =>
      <Card
        hoverable
        cover={
          <img src={"/gallery/" + src} alt=""/>
        }
        style={{marginBottom:10}}
        onClick={()=>this.showModal(src)}
      >
        <Card.Meta
          title="Europe Street beat"
          description="www.instagram.com"
        />
      </Card>
    ));

    this.setState({
      imgList,
      showModel1: false
    })
  }

  showModal=(curImg)=>{
    this.setState({
      curImg,
      showModel1:true
    })
  }

  render() {
    return (
      <Row gutter={10}>
        <Col span="5">
          {this.state.imgList[0]}
        </Col>
        <Col span="5">
          {this.state.imgList[1]}
        </Col>
        <Col span="5">
          {this.state.imgList[2]}
        </Col>
        <Col span="5">
          {this.state.imgList[3]}
        </Col>
        <Col span="4">
          {this.state.imgList[4]}
        </Col>
        <Modal
          title="图片展示"
          visible={this.state.showModel1}
          onCancel={()=>this.setState({
            showModel1: false
          })}
        >
          <img src={"/gallery/" + this.state.curImg} alt="" width="100%"/>
        </Modal>
      </Row>
    );
  }
}