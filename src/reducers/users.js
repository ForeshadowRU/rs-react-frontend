import {ADD_USER, DELETE_USER, FETCH_USERS_STARTED, FETCH_USERS_SUCCESS} from "../constants";


const initialState = {
    values: [],
    isFetching: false,
    invalidated: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_STARTED:
            return {...state, isFetching: true};
        case FETCH_USERS_SUCCESS:
            return {...state, isFetching: false, invalidated: false, values: action.payload};
        case ADD_USER:
            let values = state.values.slice();
            values.push(action.payload);
            return {...state, values: values};
        case DELETE_USER:
            return {...state, values: state.values.filter((value => value.username !== action.payload.username))};
        default:
            return state;
    }

}