import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import p from "../../package.json";

import rootReducer from "./reducers/root-reducer";
import rootSaga from "./sagas/root-saga";

export const loadState = () => {
  if (typeof sessionStorage !== "undefined") {
    const localState = sessionStorage.getItem(`state:${p.name}`);
    if (localState) {
      return JSON.parse(localState);
    }
  }
  return {};
};

export const loadItem = (key: string) => {
  if (typeof sessionStorage !== "undefined") {
    const localState = sessionStorage.getItem(`state:${p.name}:${key}`);
    if (localState) {
      return JSON.parse(localState);
    }
  }
  return null;
};

export const setItem = (key: string, data: any) => {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(`state:${p.name}:${key}`, JSON.stringify(data));
  }
};

export const loadLocalItem = (key: string) => {
  if (typeof localStorage !== "undefined") {
    const localState = localStorage.getItem(`state:${p.name}:${key}`);
    if (localState) {
      return JSON.parse(localState);
    }
  }
  return null;
};

export const removeLocalItem = (key: string) => {
  return localStorage.removeItem(`state:${p.name}:${key}`);
};

export const setLocalItem = (key: string, data: any) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(`state:${p.name}:${key}`, JSON.stringify(data));
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: (getDefaultMiddle) =>
    getDefaultMiddle({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  // preloadedState: loadState(),
});

export type SagaTypes = "SAGA" | "ROOT";
export type SagaInjector = { key: SagaTypes; saga: any };

function createSagaInjector(runSaga: any, rootSaga: any) {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  const isInjected = (key: string) => injectedSagas.has(key);

  const injectSaga = (injector: SagaInjector) => {
    // We won't run saga if it is already injected
    if (isInjected(injector.key)) return;

    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(injector.saga);

    // Save the task if we want to cancel it in the future
    injectedSagas.set(injector.key, task);
  };

  // Inject the root saga as it a staticlly loaded file,
  injectSaga({ key: "ROOT", saga: rootSaga });

  return injectSaga;
}

// sagaMiddleware.run(rootSaga); // run after create store => important// Add injectSaga method to our store
export const injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);

store.subscribe(() => {
  const state = store.getState();

  if (state.rootReducer.initialized) {
    const { currentUser, orderCarts, cacheData } = state.rootReducer;
    const { user, tokens } = currentUser ?? {};

    setLocalItem("currentUser", { user, tokens });
    setLocalItem("orderCarts", orderCarts);
    setLocalItem("cacheData", cacheData);
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export function createSagaAction<T>(type: string) {
  return (payload: T) => ({
    type: type,
    payload,
  });
}

export const selector = {
  root: (state: RootState) => state.rootReducer,
};
