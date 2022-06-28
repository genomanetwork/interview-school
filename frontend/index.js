import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {landingStore} from './store';
import {Provider} from 'react-redux';
import './styles/style.scss';



const Root = () => {
  useEffect(() => {
    const scriptLoader = document.getElementById('script-loader');
    scriptLoader.parentNode.removeChild(scriptLoader);
    delete window.__INITIAL_STATE__;
  }, []);

  return (
    <Provider store={landingStore(window.__INITIAL_STATE__)}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
