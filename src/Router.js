import React, {Fragment} from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import {createHashHistory} from 'history';
import Post from './pages/Post';
import Pasted from './pages/Pasted';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const history = createHashHistory();
const MainRouter = (...props) => (
  <Router history={history}>
    <Fragment>
      <Navbar/>
      <Switch>
        <Route component={Post} path={'/clipboard'}/>
        <Route component={Pasted} path={'/pasted'} exact/>
        <Route component={Pasted} path={'/pasted/:hash'} exact/>
        <Redirect to={'/clipboard'}/>
      </Switch>
      <Footer/>
    </Fragment>
  </Router>
);

export default MainRouter;
export {history};
