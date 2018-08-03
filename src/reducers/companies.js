const initialState = [];

export default function (state = initialState, action) {

    switch (action.type) {
        case "ADD_COMPANY":
            return state.concat(action.payload);
        case "DELETE_COMPANY_BY_NAME":
            let newState = state.slice();
            newState.splice(newState.find(action.payload), 1);
            return newState;
        default:
            return state;
    }

}