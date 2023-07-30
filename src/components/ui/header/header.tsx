import { FC } from 'react'

import { Logo } from '../../../common/assets/img'
import { Button } from '../button'
import { DropDownMenuDemo, ProfileBlock } from '../dropDownMenu'
import { Typography } from '../typography'

import s from './header.module.scss'

type HeaderProps = {
  isAuth: boolean
}
export const Header: FC<HeaderProps> = ({ isAuth }) => {
  const dropDownMenu = [
    { id: 1, component: <ProfileBlock /> },
    { id: 2, component: <Button variant={'primary'}> 2 </Button> },
    { id: 3, component: <Button variant={'primary'}> 3 </Button> },
  ]

  return (
    <div className={s.headerBlock}>
      <Logo />
      {!isAuth && <Button variant={'primary'}>Sign In</Button>}
      {isAuth && (
        <div className={s.avatar_menu}>
          <Typography variant={'subtitle1'} className={s.menu_name}>
            Name
          </Typography>
          <DropDownMenuDemo items={dropDownMenu} />
        </div>
      )}
    </div>
  )
}
