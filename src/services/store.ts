import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import useReducer from './userSlais';
import burgerReducer from './burgerConstructorSlice';
import orderReducer from './orderUserSlice';
import feedReducer from './feedSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    user: useReducer,
    burger: burgerReducer,
    order: orderReducer,
    feed: feedReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
