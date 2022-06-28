import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header-bar';
import Routes from './routes';

const App = ({
  path
}) => {

  return (
    <Router path={`${path}`}>
      <Header />
      <Routes />
    </Router>
  );
};

//PROPS
const mapStateToProps = state => {
  return state.app;
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
