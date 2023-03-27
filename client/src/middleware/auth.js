import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';

export const AuthorizeUser = ({ children }) => {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  const { token } = userToken;
  console.log(token);

  if (!tokenString) {
    return <Navigate to={'/'} replace={true}></Navigate>;
  }

  return children;
};

export const ProtectRoute = ({ children }) => {
  const username = useAuthStore.getState().auth.username;
  if (!username) {
    return <Navigate to={'/'} replace={true}></Navigate>;
  }
  return children;
};
