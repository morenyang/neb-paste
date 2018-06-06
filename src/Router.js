import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import Editor from './components/Editor';

const history = createHashHistory();
const MainRouter = (...props) => (
  <Router history={history}>
    <Fragment>
      <Route component={Editor} />
    </Fragment>
  </Router>
);

export default MainRouter;
export { history };
