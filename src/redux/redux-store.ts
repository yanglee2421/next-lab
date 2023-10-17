// Redux Toolkit Imports
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";

// Persist Imports
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
import session from "redux-persist/lib/storage/session";

// Slice Imports
import { sliceLoginLocal } from "./slice-login-local";
import { sliceLoginSession } from "./slice-login-session";
import { sliceTheme } from "./slice-theme";
import { sliceDemo } from "./slice-demo";

// Create Reducer
const rootReducer = combineReducers({
  [sliceLoginLocal.name]: sliceLoginLocal.reducer,
  [sliceLoginSession.name]: persistReducer(
    {
      key: sliceLoginSession.name,
      storage: session,
      blacklist: [],
    },
    sliceLoginSession.reducer
  ),
  [sliceTheme.name]: sliceTheme.reducer,
  [sliceDemo.name]: sliceDemo.reducer,
});

// Create Persisted Reducer
const reducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage,
    blacklist: [sliceLoginSession.name, sliceDemo.name],
  },
  rootReducer
);

// Create Store
export const store = configureStore({
  reducer,
  middleware(getMiddleWare) {
    return getMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

// Create Persisted Store
export const persistor = persistStore(store);

// ** Types
type RootReducer = typeof rootReducer;
export type RootState = RootReducer extends Reducer<infer R> ? R : unknown;
export type AppDispatch = typeof store.dispatch;
