import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Decks } from './components/page/decks/decks'
import { useGetDecksQuery } from './services/base-api'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  const { isLoading, data } = useGetDecksQuery()

  if (isLoading) return <div>Loading....</div>
  console.log(data)

  return <RouterProvider router={router} />
}
function PrivateRoutes() {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
