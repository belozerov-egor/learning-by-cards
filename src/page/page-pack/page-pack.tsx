import { FC } from 'react'

import { Link } from 'react-router-dom'

import { Back } from '../../common'
import { Button, Typography } from '../../components'

import s from './page-pack.module.scss'

type PropsType = {
  name?: string
}
export const PagePack: FC<PropsType> = ({ name }) => {
  return (
    <div className={s.packListBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <Typography variant={'large'} className={s.title}>
        {name}
      </Typography>
      <Typography variant={'body1'} className={s.description}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      <div className={s.addNewPackButton}>
        <Button variant={'primary'}>Add New Card</Button>
      </div>
    </div>
  )
}
