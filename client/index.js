import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Users from './components/Users';
import Login from './components/Login';
import NewUser from './components/NewUser';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/login" component={ Login } />
      <Route path="/newuser" component={ NewUser } />
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="users" component={ Users } />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
