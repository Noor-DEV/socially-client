import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import authReducer from "./store/index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
//REDUX-PERSIST
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
//REDUX-PERSIST

//This part still has redux-persist related implementations
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// const dispatch = useDispatch();
// dsipatch(defaultPopUp());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
