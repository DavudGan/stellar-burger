import { Outlet } from 'react-router-dom';
import { AppHeader } from '@components';

export const Layout = () => (
  <div>
    <AppHeader />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
