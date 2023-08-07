import { SignIn } from '../../../../components'
import { useLoginMutation } from '../../auth.ts'

export const Login = () => {
  const [login] = useLoginMutation()

  return (
    <>
      <SignIn onSubmit={login} />
    </>
  )
}
