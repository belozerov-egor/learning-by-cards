import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import {
  CheckEmail,
  CreateNewPassword,
  ForgotPassword,
  Layout,
  Loader,
  Profile,
  SignUp,
} from './components'
import { ConfirmationEmail } from './components/confirmation-email/confirmation-email.tsx'
import { FriendsPack, LearnPack, Login, MyPack, PacksList } from './page'
import { EmptyPack } from './page/empty-pack'
import { useMeQuery } from './services'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/recover-password/:token',
    element: <CreateNewPassword />,
  },
  {
    path: '/check-email/:email',
    element: <CheckEmail />,
  },
  {
    path: '/confirm-email/:code',
    element: <ConfirmationEmail />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PacksList />,
  },
  {
    path: '/my-pack/:id',
    element: <MyPack />,
  },
  {
    path: '/friends-pack/:id',
    element: <FriendsPack />,
  },
  {
    path: '/empty-pack/:name/:id',
    element: <EmptyPack />,
  },
  {
    path: '/learn-pack/:id',
    element: <LearnPack />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])

function PrivateRoutes() {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <Loader />

  return data ? <Outlet /> : <Navigate to="/login" />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
