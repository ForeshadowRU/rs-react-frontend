import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './index.css';
import SignUp from './components/SignUp/Registration'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import reducer from './reducers/reducer'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import fixtures from "./fixtures/vacancies";


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


fixtures.forEach((fixture) => store.dispatch({
    type: "ADD_VACANCY",
    payload: fixture
}))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/signup" component={SignUp}/>
            </Switch>

        </Router>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
