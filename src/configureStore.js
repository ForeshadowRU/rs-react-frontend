import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/reducer";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";
import history from './history'
import {composeWithDevTools} from "redux-devtools-extension";
import {logger} from "redux-logger";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(
        connectRouter(history)(persistedReducer),
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                thunk,
                logger,
            )));
    let persistor = persistStore(store);
    return {store, persistor}
}
