import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, RootState, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams<{ number: string }>();
  const { buns, mains, sauces } = useSelector(
    (state: RootState) => state.ingredients
  );
  const feedOrders = useSelector((state: RootState) => state.feed.orderFeet);
  const userOrders = useSelector((state: RootState) => state.order.orderUser);

  const allOrders = [...feedOrders, ...userOrders];

  const orderData = allOrders.find(
    (order: TOrder) => Number(order.number) === Number(number)
  );

  const ingredients: TIngredient[] = [...buns, ...mains, ...sauces];

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  return <OrderInfoUI orderInfo={orderInfo} />;
};
