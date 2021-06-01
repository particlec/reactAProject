import { Layout } from 'antd';
import React from 'react';
import {
  Link,
  HashRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import Login from '../login';
import App from '../App';
import LineChart from '../lineChart/lineChart';
import Register from '../register';
import ClipTest from '../utils/clipTest';
import Declare from '../utils/declare';
import Simplest from '../utils/simpTest';
import ClipBottom from '../botton';
import LayoutRoute from './layoutRoute';
import SideLayout from '../utils/sideLayout';

function Routers() {
  return (
    <HashRouter>
      <Layout className="content">
        {/* 路由动态内容 start */}
        <Router>
          <div>
            <Switch>
              <Route exact path="/home/login">
                <Login />
                {/*<ClipBottom />*/}
              </Route>
              <Route exact path="/App/Register">
                <Register />
                {/*<ClipBottom />*/}
              </Route>
              <Route exact path="/App/LineChart">
                <LineChart />
                {/*<ClipBottom />*/}
              </Route>
              <Route exact path="/App/Declare">
                <Declare />
              </Route>
              <Route exact path="/Simplest">
                <Simplest />
              </Route>
              <Route exact path="/App/login">
                <App />
              </Route>
              <Route exact path="/App/ClipBottom">
                <ClipBottom />
              </Route>
              <Route exact path="/App/ClipTest">
                <ClipTest />
              </Route>
              <Redirect to="/home/login" />
            </Switch>
          </div>
        </Router>
        <ClipBottom />
        {/* 路由动态内容 end */}
      </Layout>
    </HashRouter>
  );
}
export default Routers;
