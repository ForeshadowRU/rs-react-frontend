import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {applyMiddleware, createStore} from 'redux'
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router'
import './index.css';
import SignUp from './components/SignUp/Registration'
import App from './Home';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import reducer from './reducers/reducer'
import thunk from 'redux-thunk'
import vacancies from "./fixtures/vacancies";
import companies from "./fixtures/companies"
import CompaniesPage from "./components/CompaniesPage"
import CompanyPage from './components/CompanyPage'
import VacancyPage from './components/VacancyPage'
import {composeWithDevTools} from "redux-devtools-extension";


const history = createBrowserHistory();
const store = createStore(
    connectRouter(history)(reducer),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
        ),
    ),
);


vacancies.forEach((vacancy) => store.dispatch({
    type: "ADD_VACANCY",
    payload: vacancy
}));

companies.forEach((company) => store.dispatch(
    {
        type: "ADD_COMPANY",
        payload: company
    }
));

history.listen(location => console.log(location.pathname));
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/vacancies/:id' component={VacancyPage}/>
                <Route path='/companies/:id' component={CompanyPage}/>
                <Route path='/companies' component={CompaniesPage}/>

            </Switch>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);
store.dispatch({
        type: "USER_LOGIN_SUCCESSFUL",
        payload: {
            name: "Ebanko",
            password: null,
            privileges: ["GUEST"],

        }
    }
);
registerServiceWorker();
