import {combineReducers} from 'redux';
import companies from './companies'
import vacancies from './vacancies'
import currentUser from './currentUser'


export default combineReducers({
        vacancies,
        companies,
        currentUser
    }
);