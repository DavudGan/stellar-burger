import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logout, logoutUser } from '../../services/userSlais';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
