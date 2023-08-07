import { Route, Routes } from 'react-router-dom'

import { CheckEmail, CreateNewPassword, ForgotPassword, SignIn, SignUp } from '../auth'

export const Routing = () => {
  console.log('Routing component is rendering')

  return (
    <Routes>
      <Route path={'/'} element={<SignIn />} />
      <Route path={'/login'} element={<SignIn />} />
      <Route path={'/sign-up'} element={<SignUp />} />
      <Route path={'/create-new-password'} element={<CreateNewPassword />} />
      <Route path={'/forgot-password'} element={<ForgotPassword />} />
      <Route path={'/check-email'} element={<CheckEmail email={'egorbelozerov@mail.ru'} />} />
    </Routes>
  )
}
