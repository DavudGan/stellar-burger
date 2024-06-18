import { configureStore} from '@reduxjs/toolkit';
import ingredientsReducer, { fetchIngredients } from '../src/services/ingredientsSlice';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { expect, describe } from '@jest/globals';

// Мокируем API функцию
jest.mock('@api', () => ({
  getIngredientsApi: jest.fn(),
}));

describe('Срез ingredients', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Очищаем все моки после каждого теста
  });

  it('должен корректно обрабатывать успешный запрос fetchIngredients', async () => {
    const mockIngredients: TIngredient[] = [
      { _id: '1', name: 'Bun 1', type: 'bun', proteins: 5, fat: 3, carbohydrates: 20, calories: 150, price: 2, image: '', image_large: '', image_mobile: '' },
      { _id: '2', name: 'Main 1', type: 'main', proteins: 10, fat: 8, carbohydrates: 15, calories: 250, price: 5, image: '', image_large: '', image_mobile: '' },
      { _id: '3', name: 'Sauce 1', type: 'sauce', proteins: 1, fat: 0.5, carbohydrates: 5, calories: 30, price: 1, image: '', image_large: '', image_mobile: '' },
    ];

    // Устанавливаем мок для getIngredientsApi, чтобы вернуть успешный ответ
    (getIngredientsApi as jest.Mock).mockResolvedValueOnce(mockIngredients);

    // Диспатчим fetchIngredients и ожидаем его выполнение
    await store.dispatch(fetchIngredients());

    // Получаем текущее состояние хранилища
    const state = store.getState().ingredients;

    // Проверяем, что состояние хранилища обновилось правильно
    expect(state.status).toBe('succeeded');
    expect(state.error).toBeNull();
    expect(state.buns).toEqual([
      { _id: '1', name: 'Bun 1', type: 'bun', proteins: 5, fat: 3, carbohydrates: 20, calories: 150, price: 2, image: '', image_large: '', image_mobile: '' },
    ]);
    expect(state.mains).toEqual([
      { _id: '2', name: 'Main 1', type: 'main', proteins: 10, fat: 8, carbohydrates: 15, calories: 250, price: 5, image: '', image_large: '', image_mobile: '' },
    ]);
    expect(state.sauces).toEqual([
      { _id: '3', name: 'Sauce 1', type: 'sauce', proteins: 1, fat: 0.5, carbohydrates: 5, calories: 30, price: 1, image: '', image_large: '', image_mobile: '' },
    ]);
  });

  it('должен корректно обрабатывать ошибочный запрос fetchIngredients', async () => {
    const errorMessage = 'Ошибка API';
    // Устанавливаем мок для getIngredientsApi, чтобы вернуть ошибку
    (getIngredientsApi as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Диспатчим fetchIngredients и ожидаем его выполнение
    await store.dispatch(fetchIngredients());

    // Получаем текущее состояние хранилища
    const state = store.getState().ingredients;

    // Проверяем, что состояние хранилища обновилось правильно
    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });
});
