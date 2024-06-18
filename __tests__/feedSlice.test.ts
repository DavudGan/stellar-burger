import { configureStore } from '@reduxjs/toolkit';
import feedConstructorReducer, { getFeed } from '../src/services/feedSlice';
import { expect, describe } from '@jest/globals';

// Мокируем API функцию
const mockFeeds = [
  {
    _id: '1',
    status: 'completed',
    name: 'Order 1',
    createdAt: '2024-06-18',
    updatedAt: '2024-06-18',
    number: 1,
    ingredients: ['1', '2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Order 2',
    createdAt: '2024-06-17',
    updatedAt: '2024-06-17',
    number: 2,
    ingredients: ['3', '4']
  }
];

const mockResponse = {
  orders: mockFeeds,
  total: 10,
  totalToday: 5
};

const mockApi = jest.fn(() => Promise.resolve(mockResponse));

// Мокируем модуль @api
jest.mock('@api', () => ({
  getFeedsApi: () => mockApi()
}));

describe('Срез feedConstructor', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        feedConstructor: feedConstructorReducer
      }
    });
  });

  it('должен обрабатывать getFeed.pending и getFeed.fulfilled', async () => {
    await store.dispatch(getFeed());

    const state = store.getState().feedConstructor;
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(false);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
  });

  it('должен обрабатывать getFeed.rejected', async () => {
    mockApi.mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    await store.dispatch(getFeed());

    const state = store.getState().feedConstructor;
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(true);
  });
});
