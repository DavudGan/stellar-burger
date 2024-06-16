import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { RootState, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
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
