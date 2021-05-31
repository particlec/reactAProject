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
import ClipTest02 from '../utils/clipTest02';
import Declare from '../utils/declare';
import Simplest from '../utils/simpTest';
import LayoutRoute from './layoutRoute';
import SideLayout from '../utils/sideLayout';
import ClipBottom from '../botton';

function Routers() {
  return (
    <HashRouter>
      {/*<Switch>*/}
      <Router>
        <div>
          <Switch>
            <Route exact path="/home/login">
              <Login />
            </Route>
            <Route exact path="/App/Register">
              <Register />
            </Route>
            <Route exact path="/App/LineChart">
              <LineChart />
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
              {/*<ClipTest02 />*/}
            </Route>

            <Redirect to="/home/login" />
          </Switch>
          <nav>
            <ul>
              <li>
                <ClipBottom />
                {/*<Link to="/App/ClipBottom">ClipBottom</Link>*/}
              </li>
            </ul>
          </nav>
        </div>
      </Router>

      {/*<LayoutRoute*/}
      {/*  exact*/}
      {/*  path="/home/login"*/}
      {/*  layout={SideLayout}*/}
      {/*  component={Login}*/}
      {/*/>*/}

      {/*<LayoutRoute*/}
      {/*  exact*/}
      {/*  path="/App/login"*/}
      {/*  layout={SideLayout}*/}
      {/*  component={App}*/}
      {/*/>*/}
      {/*<LayoutRoute*/}
      {/*  exact*/}
      {/*  path="/App/LineChart"*/}
      {/*  layout={SideLayout}*/}
      {/*  component={LineChart}*/}
      {/*/>*/}

      {/*<LayoutRoute*/}
      {/*  exact*/}
      {/*  path="/App/Declare"*/}
      {/*  layout={SideLayout}*/}
      {/*  component={Declare}*/}
      {/*/>*/}

      {/*<LayoutRoute*/}
      {/*  exact*/}
      {/*  path="/App/Register"*/}
      {/*  layout={SideLayout}*/}
      {/*  component={Register}*/}
      {/*/>*/}

      {/*<LayoutRoute*/}
      {/*  exact*/}
      {/*  path="/Simplest"*/}
      {/*  layout={SideLayout}*/}
      {/*  component={Simplest}*/}
      {/*/>*/}

      {/*<Redirect to="/home/login" />*/}
      {/*</Switch>*/}
    </HashRouter>
  );
}
export default Routers;
