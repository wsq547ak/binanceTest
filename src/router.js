import { Router, Route, hashHistory } from 'react-router'
import React from 'react';

import Main from './pages/main';
import UserSetting from './pages/userSetting'
import unitDetail from './pages/unitDetail'

const Routers = () =>
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
    <Route path="/user" component={UserSetting} />
    <Route path="/unitDetail" component={unitDetail} />
  </Router>

export default Routers