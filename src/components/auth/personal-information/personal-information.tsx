import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AvatarInCard, Edit, Logout } from '../../../common'
import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './personalInformation.module.scss'

const sigInSchema = z.object({
  nickName: z.string().trim().min(1),
})

type SignInFormShem = z.infer<typeof sigInSchema>
export const PersonalInformation = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
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
        <div className={s.avatar}>
          <AvatarInCard />
          {!editMode && (
            <div className={s.avatarEdit}>
              <Edit />
            </div>
          )}
        </div>
      </div>
      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            name={'nickName'}
            label={'Nickname'}
            type={'default'}
            control={control}
            className={s.editNickName}
            placeholder={'Nickname'}
          />
          <Button
            fullWidth={true}
            className={s.submit}
            type="submit"
            onClick={() => setEditMode(false)}
          >
            Save Changes
          </Button>
        </form>
      ) : (
        <div className={s.infoBlock}>
          <div className={s.nameBlock}>
            <Typography variant={'h1'} className={s.name}>
              Ivan
            </Typography>
            <Edit onClick={() => setEditMode(true)} />
          </div>
          <Typography variant={'body2'} as={'span'} className={s.email}>
            j&johnson@gmail.com
          </Typography>
          <Button variant={'secondary'} className={s.logout}>
            <Logout />
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        </div>
      )}
    </Card>
  )
}
