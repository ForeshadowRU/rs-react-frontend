import {
    ADD_VACANCY,
    DELETE_VACANCY,
    FETCH_VACANCIES,
    FETCH_VACANCIES_SUCCESS,
    INVALIDATE_VACANCIES
} from "../constants";

const initialState = {
    values: [],
    isFetching: false,
    timestamp: new Date(),
    invalidated: false,
};

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_VACANCIES:
            return {...state, isFetching: true};
        case FETCH_VACANCIES_SUCCESS:
            return {...state, values: action.payload, timestamp: new Date(), isFetching: false, invalidated: false};
        case INVALIDATE_VACANCIES:
            return {...state, invalidated: true};
        case ADD_VACANCY:
            return {...state, values: state.values.push(action.payload)};
        case DELETE_VACANCY:
            return {...state, values: state.values.filter(vacancy => vacancy.id !== action.payload)};

        default:
            return state;
    }

}