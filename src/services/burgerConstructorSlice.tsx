// store/ingredientsSlice.ts
import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

interface BurgerConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderError: boolean;
  orderData: any;
  orderUser: any;
}

const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderError: false,
  orderData: null,
  orderUser: null
};

// Асинхронный thunk для получения ингредиентов
export const placeOrder = createAsyncThunk(
  'burgerConstructor/placeOrder',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    console.log(response)
    return response.order;
  }
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    clearConstructor(state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    clearOrder(state) {
      state.orderData = null;
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0) {
        [
          state.constructorItems.ingredients[index],
          state.constructorItems.ingredients[index - 1]
        ] = [
          state.constructorItems.ingredients[index - 1],
          state.constructorItems.ingredients[index]
        ];
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        [
          state.constructorItems.ingredients[index],
          state.constructorItems.ingredients[index + 1]
        ] = [
          state.constructorItems.ingredients[index + 1],
          state.constructorItems.ingredients[index]
        ];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderError = true;
      });
  }
});
export const {
  addIngredient,
  clearOrder,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

