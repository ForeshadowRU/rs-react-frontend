import {
    ADD_COMPANY,
    DELETE_COMPANY,
    FETCH_COMPANIES_ERROR,
    FETCH_COMPANIES_START,
    FETCH_COMPANIES_SUCCESS
} from "../constants";

const initialState = {
    values: [],
    isFetching: false,
    timestamp: new Date(),
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ADD_COMPANY:
            let values = state.values.slice();
            values.push(action.payload);
            return {...state, values: values};
        case DELETE_COMPANY:
            return {...state, values: state.values.filter(company => company.id !== action.payload)};
        case FETCH_COMPANIES_SUCCESS:
            return {...state, values: action.payload, isFetching: false, timestamp: new Date()};
        case FETCH_COMPANIES_START:
            return {...state, isFetching: true};
        case FETCH_COMPANIES_ERROR:
            return {...state, isFetching: false};
        default:
            return state;
    }

}