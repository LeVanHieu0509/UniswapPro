import { LoadingKey } from "@custom-types/loading";
import { createSlice } from "@reduxjs/toolkit";
import { isBoolean, pickBy } from "lodash";

interface RootState {
  loading: LoadingKey;
  initialized: boolean;
  accessToken?: string;
  reLoading: boolean;
  currentUser?: {
    user: {
      usr_id: number;
      usr_name: string;
      usr_roles: "EMPLOYEE" | "ADMINIE";
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
  orderCarts: any;
  cacheData: any;
}
const initialState: RootState = {
  loading: {},
  initialized: false,
  accessToken: null,
  reLoading: false,
  currentUser: null,
  orderCarts: [],
  cacheData: null,
};

const rootSlice = createSlice({
  name: "root",
  initialState: initialState,
  reducers: {
    setLoading: (state, actions: { type: string; payload: LoadingKey }) => {
      const payload = actions.payload;
      if (isBoolean(actions.payload)) {
        state.loading = {
          ...state.loading,
          ...payload,
        };
      } else {
        state.loading = pickBy({ ...state.loading, ...actions.payload }, (value) => value) as LoadingKey;
      }
    },

    setInitialized(state, actions) {
      state.initialized = actions.payload;
    },
    setAccessToken: (state, actions) => {
      state.accessToken = actions.payload;
    },
    setCurrentUser: (state, actions) => {
      state.currentUser = actions.payload;
    },
    setOrderCarts: (state, actions) => {
      state.orderCarts = actions.payload;
    },
    setCacheData: (state, actions) => {
      state.cacheData = actions.payload;
    },
    setReloading: (state, actions) => {
      state.reLoading = actions.payload;
    },
  },
});

export const rootAction = rootSlice.actions;

export default rootSlice.reducer;
