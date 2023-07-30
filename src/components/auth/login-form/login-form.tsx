import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledCheckbox, ControlledTextField } from '../../ui'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  console.log('test')
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField control={control} name={'email'} label={'email'} type={'default'} />
      <ControlledTextField
        control={control}
        name={'password'}
        label={'password'}
        type={'password'}
      />
      <ControlledCheckbox
        control={control}
        variant={'withText'}
        checkBoxText={'remember me'}
        name={'rememberMe'}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
