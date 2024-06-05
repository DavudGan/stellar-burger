import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFeed } from '../../services/feedSlice';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';

export const Feed: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector((state: RootState) =>
    state.feed.orderFeet.find(
      (order: TOrder) => order.number === Number(number)
    )
  );
  const feedData = useSelector((state: RootState) => state.feed.orderFeet);
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = feedData;

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
