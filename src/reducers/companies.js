import {ADD_COMPANY, DELETE_COMPANY, FETCH_COMPANY_START, FETCH_COMPANY_SUCCESS} from "../constants";

const initialState = [];

export default function (state = initialState, action) {

    switch (action.type) {
        case ADD_COMPANY:
            return state.concat(action.payload);
        case DELETE_COMPANY:
            return state.filter(company => company.id !== action.payload);
        case FETCH_COMPANY_SUCCESS:
            return state.filter((company) => company.id !== action.payload.id).concat(action.payload);
        case FETCH_COMPANY_START:
            return state.concat({
                id: action.payload,
                isFetching: true
            });
        case "FETCH_COMPANY_ERROR":
            return state;
        default:
            return state;
    }

}