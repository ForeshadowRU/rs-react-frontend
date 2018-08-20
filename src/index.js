import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import './index.css';
import SignUp from './components/Authentication/Authentication'
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import companies from "./fixtures/companies"
import CompaniesPage from "./components/CompaniesPage"
import CompanyPage from './components/CompanyPage'
import VacancyPage from './components/VacancyPage'
import configureStore from './configureStore'
import history from './history'
import {getLoadingAnimation} from "./functions";
import cubeLoading from './resources/svg/cube-loading.gif'
import {PersistGate} from 'redux-persist/integration/react'
import RegistrationForm from "./components/Authentication/RegistrationForm";

const {store, persistor} = configureStore();

ReactDOM.render(
    <PersistGate loading={getLoadingAnimation(cubeLoading, "Loading...")} persistor={persistor}>
        <Provider store={store}>

            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/vacancies/:id' component={VacancyPage}/>
                    <Route path='/companies/:id' component={CompanyPage}/>
                    <Route path='/companies' component={CompaniesPage}/>
                    <Route path='/register/' component={RegistrationForm}/>
                </Switch>
            </ConnectedRouter>

        </Provider>
    </PersistGate>
    , document.getElementById('root')
);

companies.forEach((company) => store.dispatch(
    {
        type: "ADD_COMPANY",
        payload: company
    }
));

registerServiceWorker();