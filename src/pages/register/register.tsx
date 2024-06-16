import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { registerUser } from '../../services/userSlais';
import { Preloader } from '@ui';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.user
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, name: userName, password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error ? error.toString() : ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
