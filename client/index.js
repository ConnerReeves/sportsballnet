import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import LeaguesContainer from './containers/LeaguesContainer';
import Login from './components/Login';
import NewUser from './components/NewUser';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/login" component={ Login } />
      <Route path="/newuser" component={ NewUser } />
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="leagues" component={ LeaguesContainer } />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
