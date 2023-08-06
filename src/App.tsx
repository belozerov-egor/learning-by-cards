import { Header } from './components'
import { Router } from './router'

export function App() {
  return (
    <>
      <Header isAuth={true} />
      <Router />
    </>
  )
}
