import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from './components'
import { PacksList, MyPack, FriendsPack, Login, LearnPack } from './page'
import { EmptyPack } from './page/empty-pack'
import { useMeQuery } from './services'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
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

  if (isLoading) return <div>...Loading</div>

  return data ? <Outlet /> : <Navigate to={'/login'} />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
