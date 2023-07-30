import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AvatarInCard } from '../../../common'
import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './personalInformation.module.scss'

const sigInSchema = z.object({
  nickName: z.string().trim().min(1),
})

type SignInFormShem = z.infer<typeof sigInSchema>
export const PersonalInformation = () => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    resolver: zodResolver(sigInSchema),
  })
  const onSubmit = (data: SignInFormShem) => {
    console.log(data)
  }

  return (
    <Card className={s.block}>
      <Typography className={s.title} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.avatarBlock}>
        <AvatarInCard />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name={'nickName'}
          label={'Nickname'}
          type={'default'}
          control={control}
          className={s.nickName}
          placeholder={'Nickname'}
        />
        <Button fullWidth={true} className={s.submit} type="submit">
          Save Changes
        </Button>
      </form>
    </Card>
  )
}
