import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'

export default class Header extends React.Component{
  componentWillMount() {
    this.setState({
      username: '河畔一角'
    });

    setInterval(()=>{
      this.setState({
        sysTime: Util.formatDate(new Date().getTime())
      });
    }, 1000);

    this.getWeatherApiDate();
  }

  getWeatherApiDate = ()=> {
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then( (res) => {
      var data = res.results[0].weather_data[0];
      var dayPictureUrl = data.dayPictureUrl;
      var weather = data.weather;
      this.setState({
        dayPictureUrl,weather
      })
    })
  }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span="24">
            <span>欢迎，{ this.state.username }</span>
            <a href="/to">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span="4" className="breadcrumb-title">首页</Col>
          <Col span="20" className="weather">
            <span className="date">{ this.state.sysTime }</span>
            <span className="weather-img">
              <img src={this.state.dayPictureUrl} alt=""/>
            </span>
            <span className="weather-detail">
              {this.state.weather}
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}