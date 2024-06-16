// store/ingredientsSlice.ts
import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface BurgerConstructorState {
  orderRequest: boolean;
  orderError: boolean;
  orderUser: TOrder[];
}

const initialState: BurgerConstructorState = {
  orderRequest: false,
  orderError: false,
  orderUser: []
};

export const getOrders = createAsyncThunk('orderUser/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

const orderConstructorSlice = createSlice({
  name: 'orderConstructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.orderRequest = true;
        state.orderError = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderUser = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.orderRequest = false;
        state.orderError = true;
      });
  }
});

export default orderConstructorSlice.reducer;
