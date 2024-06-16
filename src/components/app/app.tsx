import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { ConstructorPage } from '@pages';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { NotFound404 } from '../../pages/not-fount-404';
import { ProtectedRoute } from '../ProtectedRoute/protectedRoute';
import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { AppHeader } from '../app-header';
import { OrderInfo } from '../order-info';
import { FeedInfo } from '../feed-info';

const App = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='/*' element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Ingredient Details' onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal title='Order Details' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title='Order Details' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
