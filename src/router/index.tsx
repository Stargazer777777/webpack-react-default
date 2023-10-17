import { createBrowserRouter, redirect } from 'react-router-dom';
import Home from '@/Pages/Home';
import { lazy } from 'react';
const About = lazy(() => import('@/Pages/About'));

const rootLoader = () => {
  return redirect('/home');
};

export const router = createBrowserRouter([
  {
    path: '/',
    loader: rootLoader,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);
