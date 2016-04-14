import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import AppContainer from './containers/AppContainer';
import GameSetupContainer from './containers/GameSetupContainer';
import LeagueListContainer from './containers/LeagueListContainer';
import LeagueDetailContainer from './containers/LeagueDetailContainer';
import Login from './components/Login';
import RegisterContainer from './containers/RegisterContainer';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="login" component={ Login } />
      <Route path="register">
        <IndexRoute component={ RegisterContainer } />
        <Route path=":userId" component={ RegisterContainer } />
      </Route>
      <Route path="/" component={ AppContainer }>
        <IndexRoute component={ GameSetupContainer } />
        <Route path="leagues">
          <IndexRoute component={ LeagueListContainer } />
          <Route path=":leagueId" component={ LeagueDetailContainer } />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
