import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  placeOrder
} from '../../services/burgerConstructorSlice';
import { clearOrder } from '../../services/burgerConstructorSlice';
import { Link, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state: RootState) => state.burger.constructorItems
  );
  const orderRequest = useSelector(
    (state: RootState) => state.burger.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.burger.orderData
  );

  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user === null) {
      return navigate('/login', { replace: true });
    }
    const ingredientIds: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];
    dispatch(placeOrder(ingredientIds)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
