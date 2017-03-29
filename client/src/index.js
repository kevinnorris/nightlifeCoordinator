// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

// our packages
import App from './containers/App';
import store from './store';

// our pages
import Home from './containers/HomePage';
import Login from './Auth/LoginPage';
import Signup from './Auth/SignupPage';
import NotFound from './components/NotFoundPage';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// render on page
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
