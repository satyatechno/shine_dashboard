import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import reducer from "./Reducer";
import rootSaga from "./saga/rootSaga";

const appReducer = combineReducers({
  reducer,
});

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistConfig = {
  key: "root",
  storage, // define which storage to use
};

const persistedReducers = persistReducer(persistConfig, appReducer); // create a persisted reducer

const store = configureStore({
  reducer: persistedReducers, // pass the persisted reducer instead of rootReducer to createStore
  middleware,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor };
