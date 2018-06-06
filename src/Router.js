import React, {Fragment} from 'react';
import {Router, Route} from 'react-router-dom';
import {createHashHistory} from 'history';
import Post from './pages/Post';
import Navbar from './components/Navbar'

const history = createHashHistory();
const MainRouter = (...props) => (
  <Router history={history}>
    <Fragment>
      <Navbar/>
      <Route component={Post}/>
    </Fragment>
  </Router>
);

export default MainRouter;
export {history};
