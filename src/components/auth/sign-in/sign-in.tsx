import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledCheckbox, TextField, Typography } from '../../ui'

import s from './sign-in.module.scss'

const sigInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type SignInFormShem = z.infer<typeof sigInSchema>
export const SignIn = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })
  const onSubmit = (data: SignInFormShem) => {
    console.log(data)
  }

  return (
    <Card className={s.signBlock}>
      <Typography variant={'large'}>Sign In</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email')}
          errorMessage={errors.email?.message}
          label={'email'}
          type={'default'}
        />
        <TextField
          {...register('password')}
          errorMessage={errors.password?.message}
          label={'password'}
          type={'default'}
        />
        <ControlledCheckbox
          control={control}
          name={'rememberMe'}
          variant={'withText'}
          checkBoxText={'remember me'}
        />
        <div className={s.forgotWrapper}>
          <Button as={'a'} variant={'link'}>
            <Typography variant={'body2'}>Forgot Password?</Typography>
          </Button>
        </div>

        <Button fullWidth={true} className={s.submit} type="submit">
          Sign In
        </Button>
      </form>
      <Typography variant={'body2'}>Already have an account?</Typography>
      <Button as={'a'} variant={'link'} className={s.signUp}>
        Sign Up
      </Button>
    </Card>
  )
}
