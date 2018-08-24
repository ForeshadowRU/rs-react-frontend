import {combineReducers} from 'redux';
import companies from './companies'
import vacancies from './vacancies'
import currentUser from './currentUser'
import users from "./users";

export default combineReducers({
    users,
        vacancies,
        companies,
    currentUser,
    }
);