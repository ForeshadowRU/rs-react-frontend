import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './index.css';
import SignUp from './components/SignUp/Registration'
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/signup" component={SignUp}/>
        </Switch>

    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
