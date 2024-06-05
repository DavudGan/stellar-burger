import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../services/orderUserSlice';
import { AppDispatch, RootState } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderData = useSelector((state: RootState) => state.order.orderUser);
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (orderRequest) {
    return <Preloader />;
  }
  const orders: TOrder[] = orderData;

  return <ProfileOrdersUI orders={orders} />;
};
