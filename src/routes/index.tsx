import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { hubRoutes } from './hubRoutes';
import { instituteRoutes } from './instituteRoutes';
import { summitRoutes } from './summitRoutes';
import { settlementRoutes } from './settlementRoutes';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  ...hubRoutes,
  ...instituteRoutes,
  ...summitRoutes,
  ...settlementRoutes,
  ...publicRoutes,
  { path: '*', element: <NotFound /> }
]);
