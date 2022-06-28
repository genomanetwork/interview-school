import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './layouts/landing';
import Dashboard from './layouts/dashboard';


const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/" component={LandingPage} />
    </Switch>
  );
};

export default Routes;
