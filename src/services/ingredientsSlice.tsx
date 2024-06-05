import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  status: 'idle',
  error: null
};

// Асинхронный thunk для получения ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.status = 'succeeded';
          state.buns = action.payload.filter((item) => item.type === 'bun');
          state.mains = action.payload.filter((item) => item.type === 'main');
          state.sauces = action.payload.filter((item) => item.type === 'sauce');
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export default ingredientsSlice.reducer;
