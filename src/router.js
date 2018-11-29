import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'

import Home from './pages/home'
import Buttons from './pages/admin/ui/buttons'
import Modals from './pages/admin/ui/modals'
import Loadings from './pages/admin/ui/loadings'
import Notification from './pages/admin/ui/notification'
import Message from './pages/admin/ui/message'
import Tabs from './pages/admin/ui/tabs'
import Gallery from './pages/admin/ui/gallery'

import NoMatch from './pages/nomatch'
import FormLogin from "./pages/admin/form/login";
import FormRegisiter from "./pages/admin/form/register";
import BasicTable from "./pages/admin/table/basic";
import City from "./pages/admin/city";
import PermissionUser from "./pages/admin/permission";
import HighTable from "./pages/admin/table/high";
import Order from "./pages/admin/order";
import Common from "./common"
import OrderDetail from "./pages/admin/order/detail";
import User from "./pages/admin/user";

export default class IRouter extends React.Component{
  render() {
    return (

        <HashRouter>
          <App>
              <Route path="/login" component={Login}/>
              <Route path="/admin" render={()=>(
                <Admin>
                  <Switch>
                    <Route path="/admin/home" component={Home}/>
                    <Route path="/admin/ui/buttons" component={Buttons}/>
                    <Route path="/admin/ui/modals" component={Modals}/>
                    <Route path="/admin/ui/loading" component={Loadings}/>
                    <Route path="/admin/ui/notification" component={Notification}/>
                    <Route path="/admin/ui/message" component={Message}/>
                    <Route path="/admin/ui/tabs" component={Tabs}/>
                    <Route path="/admin/form/login" component={FormLogin}/>
                    <Route path="/admin/form/reg" component={FormRegisiter}/>
                    <Route path="/admin/table/basic" component={BasicTable}/>
                    <Route path="/admin/table/high" component={HighTable}/>

                    <Route path="/admin/ui/gallery" component={Gallery}/>
                    <Route path="/admin/city" component={City}/>
                    <Route path="/admin/order" component={Order}/>
                    <Route path="/admin/user" component={User}/>

                    <Route path="/admin/permission" component={PermissionUser}/>
                    <Route component={NoMatch}/>
                  </Switch>
                </Admin>
              )}/>
              <Route path="/common" render={()=>
                <Common>
                  <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                </Common>
              }/>
          </App>
        </HashRouter>

    );
  }
}