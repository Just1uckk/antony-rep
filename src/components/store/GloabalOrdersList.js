import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, getOrders } from "../Firebase";

export const fetchOrders = createAsyncThunk(
    'toolkit/fetchOrders',
    async function () {
        const data = await getOrders(db);
        return data
    },
  );

const GlobalOrderList = createSlice({
    name: "globalOrders",
    initialState: {
    err: "",
    isLoading: "",
    orders: []
    },
    reducers : {
        saveOrders(initialState, {payload:data}) {
            initialState.orders = data
        },
        handleExitOrders(initialState){
          initialState.orders = ''
        },
        changeStatus(initialState, {payload:data}){
          console.log(data.index, data.value)
          initialState.orders[data.index].status = data.value
        }
    },
    extraReducers : {
        [fetchOrders.pending]: (initialState, action) => {
            initialState.err = null;
            initialState.isLoading = true;
          },
          [fetchOrders.fulfilled]: (initialState, action) => {
            initialState.orders = action.payload;
            initialState.err = null;
            initialState.isLoading = false;
          },
          [fetchOrders.rejected]: (initialState, action) => {
            initialState.status = 'error';
            initialState.err = 'error';
            console.log('order fetch error');
          },
    }
})

export default GlobalOrderList.reducer
export const {
  changeStatus,
    saveOrders,
    handleExitOrders
} = GlobalOrderList.actions