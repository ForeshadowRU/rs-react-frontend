import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import './index.css';
import SignUp from './components/SignUp/Registration'
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import vacancies from "./fixtures/vacancies";
import companies from "./fixtures/companies"
import CompaniesPage from "./components/CompaniesPage"
import CompanyPage from './components/CompanyPage'
import VacancyPage from './components/VacancyPage'
import store from './store'
import history from './history'


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/vacancies/:id' component={VacancyPage}/>
                <Route path='/companies/:id' component={CompanyPage}/>
                <Route path='/companies' component={CompaniesPage}/>
            </Switch>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
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

registerServiceWorker();