import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { getFeed } from '../../services/feedSlice';
import { OrdersList } from '@components';
import { Feed } from '@pages';
import { useParams } from 'react-router-dom';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  const orderData = useSelector((state: RootState) =>
    state.feed.orderFeet.find(
      (order: TOrder) => order.number === Number(number)
    )
  );
  const feedData = useSelector((state: RootState) => state.feed.orderFeet);
  const total = useSelector((state: RootState) => state.feed.total);
  const totalToday = useSelector((state: RootState) => state.feed.totalToday);

  /** TODO: взять переменные из стора */
  const orders: TOrder[] = feedData;
  const feed = { total, totalToday };
  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
