import { Router } from './router'
import { useMeQuery } from './services/auth'

export function App() {
  const { data, isLoading, isError } = useMeQuery()

  console.log(data)
  console.log(isLoading)
  console.log(isError)

  return (
    <>
      <Router />
    </>
  )
}
