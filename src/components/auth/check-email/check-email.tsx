import { Link, useParams } from 'react-router-dom'

import { Email } from '../../../common'
import { Button, Card, Typography } from '../../ui'

import s from './check-email.module.scss'

export const CheckEmail = () => {
  const params = useParams<{ email: string }>()

  return (
    <Card className={s.checkEmailBlock}>
      <Typography className={s.title} variant={'large'}>
        Check Email
      </Typography>
      <Email className={s.emailIcon} />
      <Typography variant={'body2'} className={s.description}>
        We’ve sent an Email with instructions to {params.email}
      </Typography>
      <Button as={Link} to="/login" fullWidth={true} className={s.backToSignIn}>
        Back to Sign In
      </Button>
    </Card>
  )
}
