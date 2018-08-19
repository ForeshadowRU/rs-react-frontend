const initialState = {
    name: "Guest",
    password: null,
    privileges: ["GUEST"],

};

export default function (state = initialState, action) {
    switch (action.type) {
        case "USER_LOGIN_SUCCESSFUL":
            return action.payload;
        case "USER_LOGOUT_SUCCESSFUL":
            return initialState;
        default:
            return state;
    }

}