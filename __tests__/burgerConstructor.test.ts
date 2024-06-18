import { expect, test, describe } from '@jest/globals';
import { TConstructorIngredient } from '@utils-types';
import burgerConstructorReducer, {
  addIngredient,
  clearConstructor,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearOrder
} from '../src/services/burgerConstructorSlice';

describe('burgerConstructor slice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderError: false,
    orderData: null,
    orderUser: null
  };

  const ingredient: TConstructorIngredient = {
    _id: '2',
    id: '12',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 255,
    fat: 22,
    carbohydrates: 10,
    calories: 50,
    price: 500,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const bun = {
    _id: '4',
    id: '11',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 255,
    fat: 22,
    carbohydrates: 400,
    calories: 400,
    price: 1500,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('должен вернуть начальное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен обработать addIngredient для булочки', () => {
    const actual = burgerConstructorReducer(initialState, addIngredient(bun));
    expect(actual.constructorItems.bun).toEqual(bun);
  });

  it('должен обработать addIngredient для ингридиентов', () => {
    const actual = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient)
    );
    expect(actual.constructorItems.ingredients).toEqual([ingredient]);
  });

  it('должен обработать addIngredient для ингридиентов', () => {
    const actual = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient)
    );
    expect(actual.constructorItems.ingredients).toEqual([ingredient]);
  });

  it('должен обработать removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredient]
      }
    };
    const actual = burgerConstructorReducer(
      stateWithIngredient,
      removeIngredient('12')
    );
    expect(actual.constructorItems.ingredients).toEqual([]);
  });

  it('должен обработать clearConstructor', () => {
    const stateWithItems = {
      ...initialState,
      constructorItems: {
        bun: bun,
        ingredients: [ingredient]
      }
    };
    const actual = burgerConstructorReducer(stateWithItems, clearConstructor());
    expect(actual.constructorItems).toEqual({ bun: null, ingredients: [] });
  });

  it('должен обработать clearOrder', () => {
    const stateWithOrder = {
      ...initialState,
      orderData: { id: '123' }
    };
    const actual = burgerConstructorReducer(stateWithOrder, clearOrder());
    expect(actual.orderData).toBeNull();
  });

  it('должен обработать moveIngredientUp', () => {
    const ingredients = [
      ingredient,
      {
        _id: '3',
        id: '13',
        name: 'Экзо-Плантаго',
        type: 'main',
        proteins: 255,
        fat: 22,
        carbohydrates: 10,
        calories: 50,
        price: 500,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const stateWithIngredients = {
      ...initialState,
      constructorItems: { bun: null, ingredients }
    };
    const actual = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );
    expect(actual.constructorItems.ingredients).toEqual([
      {
        _id: '3',
        id: '13',
        name: 'Экзо-Плантаго',
        type: 'main',
        proteins: 255,
        fat: 22,
        carbohydrates: 10,
        calories: 50,
        price: 500,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      ingredient
    ]);
  });

  it('должен обработать moveIngredientUp', () => {
    const ingredients = [
      ingredient,
      {
        _id: '3',
        id: '13',
        name: 'Экзо-Плантаго',
        type: 'main',
        proteins: 255,
        fat: 22,
        carbohydrates: 10,
        calories: 50,
        price: 500,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const stateWithIngredients = {
      ...initialState,
      constructorItems: { bun: null, ingredients }
    };
    const actual = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );
    expect(actual.constructorItems.ingredients).toEqual([
      {
        _id: '3',
        id: '13',
        name: 'Экзо-Плантаго',
        type: 'main',
        proteins: 255,
        fat: 22,
        carbohydrates: 10,
        calories: 50,
        price: 500,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      ingredient
    ]);
  });
});



