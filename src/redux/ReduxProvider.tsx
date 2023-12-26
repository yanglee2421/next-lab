// React Imports
import React from "react";

// Redux Imports
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, Provider } from "react-redux";

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
import { PersistGate } from "redux-persist/integration/react";

// Slice Imports
import { sliceLoginLocal } from "./sliceLoginLocal";
import { sliceLoginSession } from "./sliceLoginSession";
import { sliceTheme } from "./sliceTheme";
import { sliceAPI } from "./sliceAPI";

// ** Reducers
import chat from "src/store/apps/chat";
import user from "src/store/apps/user";
import email from "src/store/apps/email";
import invoice from "src/store/apps/invoice";
import calendar from "src/store/apps/calendar";
import permissions from "src/store/apps/permissions";

export function ReduxProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}

const reducer = persistReducer(
  // Persist Configuration
  {
    key: "import.meta.env.VITE_REDUX_PERSISTER_KEY",
    version: 1,
    storage: createNoopStorage(true),
    blacklist: [
      sliceLoginSession.name,
      sliceAPI.reducerPath,
      "user",
      "chat",
      "email",
      "invoice",
      "calendar",
      "permissions",
    ],
  },

  // Root Reducer
  combineReducers({
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    [sliceLoginLocal.name]: sliceLoginLocal.reducer,
    [sliceLoginSession.name]: persistReducer(
      {
        key: sliceLoginSession.name,
        storage: createNoopStorage(false),
        blacklist: [],
      },
      sliceLoginSession.reducer
    ),
    [sliceTheme.name]: sliceTheme.reducer,
    [sliceAPI.reducerPath]: sliceAPI.reducer,
  })
);

const store = configureStore({
  reducer,

  // ** Middleware
  middleware(getMiddleWare) {
    return getMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sliceAPI.middleware);
  },
});

/**
 * Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
 * See `setupListeners` docs - takes an optional callback as the 2nd arg for customization
 */
setupListeners(store.dispatch);

// Persist Store
const persistor = persistStore(store);

// Hooks Types
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type UseAppDispatch = () => AppDispatch;
export type UseAppSelector = TypedUseSelectorHook<RootState>;

function createNoopStorage(useLocal: boolean) {
  if (typeof window === "undefined") {
    return {
      async getItem(key: string) {
        return key;
      },
      async setItem(key: string, value: string) {
        void key;
        return value;
      },
      async removeItem(key: string) {
        return key;
      },
    };
  }

  return useLocal ? storage : session;
}
