import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import { useMeQuery } from '../../services'
import { Header, GlobalToast } from '../ui'

export const Layout = () => {
  const { data } = useMeQuery()

  return (
    <>
      <Header data={data} />
      <GlobalToast />
      <Outlet />
    </>
  )
}
