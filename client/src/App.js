import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** import all components */
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

/** root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/password',
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AuthorizeUser>
        <Dashboard />
      </AuthorizeUser>
    ),
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>,
  },
  {
    path: '/reset',
    element: <Reset></Reset>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

export default function App() {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
