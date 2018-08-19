import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers/reducer";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";
import history from './history'
import {composeWithDevTools} from "redux-devtools-extension";
import {logger} from "redux-logger";

const store = createStore(
    connectRouter(history)(reducer),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            logger,
        ),
    ),
);
export default store;