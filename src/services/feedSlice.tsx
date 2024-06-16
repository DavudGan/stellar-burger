// store/ingredientsSlice.ts
import { getFeedsApi, getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

interface BurgerConstructorState {
  orderRequest: boolean;
  orderError: boolean;
  orderFeet: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: BurgerConstructorState = {
  orderRequest: false,
  orderError: false,
  orderFeet: [],
  total: 0,
  totalToday: 0
};

export const getFeed = createAsyncThunk('feed/getFeed', async () => {
  const response = await getFeedsApi();
  return response;
});

const feedConstructorSlice = createSlice({
  name: 'feedConstructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.orderRequest = true;
        state.orderError = false;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderFeet = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state) => {
        state.orderRequest = false;
        state.orderError = true;
      });
  }
});

export default feedConstructorSlice.reducer;
