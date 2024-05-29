import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

import { Layout } from '../layout';
import { ConstructorPage } from '@pages';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { NotFound404 } from '../../pages/not-fount-404';

const App = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='/*' element={<NotFound404 />} />
    </Route>
  </Routes>
);

export default App;
