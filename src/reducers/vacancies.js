const initialState = [];

export default function (state = initialState, action) {

    switch (action.type) {
        case "ADD_VACANCY":
            return state.concat(Object.assign({}, action.payload));
        case "DELETE_VACANCY_BY_NAME":
            let newState = state.slice();
            newState.splice(newState.find(action.payload), 1);
            return newState;
        default:
            return state;
    }

}