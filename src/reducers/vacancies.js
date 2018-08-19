import {FETCH_VACANCIES} from "../actionCreators";

const initialState = [];

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_VACANCIES:
            let slice = [];
            for (let i = 0; i < action.payload.length; i++) {
                slice = slice.concat(action.payload[i]);
            }
            return slice;
        case "ADD_VACANCY":
            return [...state, action.payload];
        case "DELETE_VACANCY_BY_ID":
            return state.filter(vacancy => vacancy.id !== action.payload);
        default:
            return state;
    }

}