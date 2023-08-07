import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { SignIn } from '../../../../components'
import { useLoginMutation, useMeQuery } from '../../auth.ts'

export const Login = () => {
  const [login] = useLoginMutation()
  const { data } = useMeQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (!data) return

    navigate('/pack-list')
  }, [data])

  return (
    <>
      <SignIn onSubmit={login} />
    </>
  )
}
