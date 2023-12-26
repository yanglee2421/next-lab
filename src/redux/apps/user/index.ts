// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

// ** Fetch Users
export const fetchData = createAsyncThunk(
  "appUsers/fetchData",
  async (params: Record<string, unknown>) => {
    const response = await axios.get("/apps/users/list", {
      params,
    });

    return response.data;
  }
);

// ** Add User
export const addUser = createAsyncThunk(
  "appUsers/addUser",
  async (
    data: { [key: string]: number | string },
    { getState, dispatch }: Record<string, unknown>
  ) => {
    const response = await axios.post("/apps/users/add-user", {
      data,
    });

    // @ts-ignore
    dispatch(fetchData(getState().user.params));

    return response.data;
  }
);

// ** Delete User
export const deleteUser = createAsyncThunk(
  "appUsers/deleteUser",
  async (
    id: number | string,
    { getState, dispatch }: Record<string, unknown>
  ) => {
    const response = await axios.delete("/apps/users/delete", {
      data: id,
    });

    // @ts-ignore
    dispatch(fetchData(getState().user.params));

    return response.data;
  }
);

export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users;
      state.total = action.payload.total;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
    });
  },
});

export default appUsersSlice.reducer;
