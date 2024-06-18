import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  forgotPasswordUser,
} from '../src/services/userSlais'; 
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
  forgotPasswordApi,
} from '@api';
import { TRegisterData, TLoginData} from '@api';
import { expect, describe } from '@jest/globals';
import { setCookie, getCookie, deleteCookie } from '../src/utils/cookie';

// Мокируем API функции и методы cookie
jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn(),
  forgotPasswordApi: jest.fn(),
}));

jest.mock('../src/utils/cookie', () => ({
  setCookie: jest.fn(),
  getCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

describe('Срез user', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Очищаем все моки после каждого теста
  });

  it('должен корректно обрабатывать успешный запрос registerUser', async () => {
    const mockResponse = {
      user: { email: 'test@example.com', name: 'Test User' },
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    };
    (registerUserApi as jest.Mock).mockResolvedValueOnce(mockResponse);

    const userData: TRegisterData = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
    };

    await store.dispatch(registerUser(userData));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockResponse.user);
    expect(state.accessToken).toEqual(mockResponse.accessToken);
    expect(state.refreshToken).toEqual(mockResponse.refreshToken);
    expect(setCookie).toHaveBeenCalledWith('accessToken', mockResponse.accessToken, { expires: 3600 });
    expect(setCookie).toHaveBeenCalledWith('refreshToken', mockResponse.refreshToken, { expires: 86400 });
  });

  it('должен корректно обрабатывать ошибочный запрос registerUser', async () => {
    const errorMessage = 'Ошибка API';
    (registerUserApi as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const userData: TRegisterData = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
    };

    await store.dispatch(registerUser(userData));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('должен корректно обрабатывать успешный запрос loginUser', async () => {
    const mockResponse = {
      user: { email: 'test@example.com', name: 'Test User' },
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    };
    (loginUserApi as jest.Mock).mockResolvedValueOnce(mockResponse);

    const loginData: TLoginData = {
      email: 'test@example.com',
      password: 'password',
    };

    await store.dispatch(loginUser(loginData));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockResponse.user);
    expect(state.accessToken).toEqual(mockResponse.accessToken);
    expect(state.refreshToken).toEqual(mockResponse.refreshToken);
    expect(setCookie).toHaveBeenCalledWith('accessToken', mockResponse.accessToken, { expires: 3600 });
    expect(setCookie).toHaveBeenCalledWith('refreshToken', mockResponse.refreshToken, { expires: 86400 });
  });

  it('должен корректно обрабатывать ошибочный запрос loginUser', async () => {
    const errorMessage = 'Ошибка API';
    (loginUserApi as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const loginData: TLoginData = {
      email: 'test@example.com',
      password: 'password',
    };

    await store.dispatch(loginUser(loginData));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('должен корректно обрабатывать успешный запрос getUser', async () => {
    const mockResponse = { user: { email: 'test@example.com', name: 'Test User' } };
    (getUserApi as jest.Mock).mockResolvedValueOnce(mockResponse);

    await store.dispatch(getUser());

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockResponse.user);
  });

  it('должен корректно обрабатывать ошибочный запрос getUser', async () => {
    const errorMessage = 'Ошибка API';
    (getUserApi as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(getUser());

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('должен корректно обрабатывать успешный запрос logoutUser', async () => {
    (logoutApi as jest.Mock).mockResolvedValueOnce({});

    await store.dispatch(logoutUser());

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(deleteCookie).toHaveBeenCalledWith('refreshToken');
  });

  it('должен корректно обрабатывать ошибочный запрос logoutUser', async () => {
    const errorMessage = 'Ошибка API';
    (logoutApi as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(logoutUser());

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('должен корректно обрабатывать успешный запрос updateUser', async () => {
    const mockResponse = { user: { email: 'test@example.com', name: 'Updated User' } };
    (updateUserApi as jest.Mock).mockResolvedValueOnce(mockResponse);

    const userData: TRegisterData = {
      email: 'test@example.com',
      password: 'password',
      name: 'Updated User',
    };

    await store.dispatch(updateUser(userData));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockResponse.user);
  });

  it('должен корректно обрабатывать ошибочный запрос updateUser', async () => {
    const errorMessage = 'Ошибка API';
    (updateUserApi as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const userData: TRegisterData = {
      email: 'test@example.com',
      password: 'password',
      name: 'Updated User',
    };

    await store.dispatch(updateUser(userData));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('должен корректно обрабатывать успешный запрос forgotPasswordUser', async () => {
    (forgotPasswordApi as jest.Mock).mockResolvedValueOnce({});

    await store.dispatch(forgotPasswordUser({ email: 'test@example.com' }));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен корректно обрабатывать ошибочный запрос forgotPasswordUser', async () => {
    const errorMessage = 'Ошибка API';
    (forgotPasswordApi as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(forgotPasswordUser({ email: 'test@example.com' }));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });
});
