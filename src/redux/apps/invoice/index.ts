// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

// ** Fetch Invoices
export const fetchData = createAsyncThunk(
  "appInvoice/fetchData",
  async (params: Record<string, unknown>) => {
    const response = await axios.get("/apps/invoice/invoices", {
      params,
    });

    return response.data;
  }
);

export const deleteInvoice = createAsyncThunk(
  "appInvoice/deleteData",
  async (
    id: number | string,
    { getState, dispatch }: Record<string, unknown>
  ) => {
    const response = await axios.delete("/apps/invoice/delete", {
      data: id,
    });

    // @ts-ignore
    await dispatch(fetchData(getState().invoice.params));

    return response.data;
  }
);

export const appInvoiceSlice = createSlice({
  name: "appInvoice",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.invoices;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
      state.total = action.payload.total;
    });
  },
});

export default appInvoiceSlice.reducer;
