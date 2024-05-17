import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../hocs/private-route.tsx';
import { ErrorPage } from '../pages/error/ErrorPage.tsx';
import { LoginPage } from '../pages/auth/LoginPage.tsx';
import { PublicRoute } from '../hocs/public-route.tsx';
import { VotingPage } from '../pages/home/VotingPage.tsx';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.tsx';
import { HomePage } from '../pages/home/HomePage.tsx';
import { AddNewQuestionPage } from '../pages/questions/AddNewQuestionPage.tsx';
import { LeaderboardPage } from '../pages/leaderboard/LeaderboardPage.tsx';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AuthenticatedLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/voting/:id',
        element: <VotingPage />
      },
      {
        path: '/leaderboard',
        element: <LeaderboardPage />
      },
      {
        path: '/add-new-question',
        element: <AddNewQuestionPage />
      }
    ],
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    )
  }
];
