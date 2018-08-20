import {USER_AUTH, USER_LOGOUT} from "../actionCreators";

const initialState = {
    isFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_AUTH:
            return action.payload;
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }

}