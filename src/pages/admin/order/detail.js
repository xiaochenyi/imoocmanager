import React from 'react'
import {Card} from 'antd'
import './detail.less'
import axios from '../../../axios/index'
export default class OrderDetail extends React.Component{
  state = {
    position_list:[
    {
      "lon": 116.361221,
      "lat": 40.043776
    }, {
      "lon": 116.363736,
      "lat": 40.038086
    }, {
      "lon": 116.364599,
      "lat": 40.036484
    }, {
      "lon": 116.373438,
      "lat": 40.03538
    }, {
      "lon": 116.377966,
      "lat": 40.036263
    }, {
      "lon": 116.379762,
      "lat": 40.03654
    }, {
      "lon": 116.38084,
      "lat": 40.033225
    }, {
      "lon": 116.38084,
      "lat": 40.029413
    }, {
      "lon": 116.381343,
      "lat": 40.021291
    }, {
      "lon": 116.381846,
      "lat": 40.015821
    }, {
      "lon": 116.382637,
      "lat": 40.008084
    }, {
      "lon": 116.398806,
      "lat": 40.008637
    }
    ],
    area:[
      {
        "lon": "116.274737",
        "lat": "40.139759",
        "ts": null
      },
      {
        "lon": "116.316562",
        "lat": "40.144943",
        "ts": null
      },
      {
        "lon": "116.351631",
        "lat": "40.129498",
        "ts": null
      },
      {
        "lon": "116.390582",
        "lat": "40.082481",
        "ts": null
      },
      {
        "lon": "116.38742",
        "lat": "40.01065",
        "ts": null
      },
      {
        "lon": "116.414297",
        "lat": "40.01181",
        "ts": null
      },
      {
        "lon": "116.696242",
        "lat": "39.964035",
        "ts": null
      },
      {
        "lon": "116.494498",
        "lat": "39.851306",
        "ts": null
      },
      {
        "lon": "116.238086",
        "lat": "39.848647",
        "ts": null
      },
      {
        "lon": "116.189454",
        "lat": "39.999418",
        "ts": null
      },
      {
        "lon": "116.244646",
        "lat": "39.990574",
        "ts": null
      },
      {
        "lon": "116.281441",
        "lat": "40.008703",
        "ts": null
      },
      {
        "lon": "116.271092",
        "lat": "40.142201",
        "ts": null
      },
      {
        "lon": "116.271092",
        "lat": "40.142201",
        "ts": null
      }
    ]
  }

  componentDidMount() {
    let orderId = this.props.match.params.orderId;
    if(orderId) {
      // this.getDetailInfo(orderId)
      this.renderMap();
    }
  }

  getDetailInfo=(orderId)=>{
    axios.ajax({
      url: 'order/detail',
      data: {
        params:{
          orderId
        }
      }
    }).then((res)=>{
      if(res.code == 0) {
        this.setState({
          orderInfo:res.result
        })
        this.renderMap();
      }
    })
  }

  renderMap = ()=>{
    //初始化地图， orderDetailMap这个是div的Id， enableMapClick设置可点击属性
    this.map = new window.BMap.Map('orderDetailMap');
    //添加控件
    this.addMapControl();
    //调用路线图绘制方法
    this.drawBikeRoute(this.state.position_list);
    //调用服务区绘制方法
    this.drawServiceArea(this.state.area);
  }

  addMapControl = () => {
    let map = this.map;
    map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}));
    map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}));
  }
  // 绘制用户的行驶路线
  drawBikeRoute = (positionList) => {
    let map = this.map;
    let startPoint = '';
    let endPoint = '';
    if(positionList.length > 0) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];
      startPoint = new window.BMap.Point(first.lon, first.lat);
      let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      })
      let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon});
      map.addOverlay(startMarker);

      endPoint = new window.BMap.Point(last.lon, last.lat);
      let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      })
      let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon});
      map.addOverlay(endMarker)

      // 链接路线图
      let trackPoint = [];
      for (let i = 0; i < positionList.length; i++) {
        let p = positionList[i];
        trackPoint.push(new window.BMap.Point(p.lon, p.lat));
      }
      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: '#1869AD',
        strokeWeight: 3
      })
      map.addOverlay(polyline);
      map.centerAndZoom(endPoint, 11);


    }
  }
  // 绘制服务区
  drawServiceArea = (positionList) => {
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
      let p = positionList[i];
      trackPoint.push(new window.BMap.Point(p.lon, p.lat));
    }
    // 绘制服务区
    let Polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#CE0000',
      strokeWeight:4,
      strokeOpacity:1,
      fillColor:'#ff8605'
    })
    this.map.addOverlay(Polygon);
  }

  render() {
    const info = this.state.orderInfo || {};
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{info.mode == 1 ? '服务区' : '停车点'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行驶起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{info.distance/1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}