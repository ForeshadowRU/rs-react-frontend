import {USER_AUTH_ERROR, USER_AUTH_STARTED, USER_AUTH_SUCCESSFUL, USER_LOGOUT} from "../constants";

const initialState = {
    isFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_AUTH_SUCCESSFUL:
            return {...action.payload, isFetching: false};
        case USER_AUTH_STARTED:
            return {...state, isFetching: true};
        case USER_AUTH_ERROR:
            return {...state, isFetching: false};
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }

}