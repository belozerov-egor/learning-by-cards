import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Avatar, Logo, Logout, Profile } from '../../../common'
import { useLogoutMutation } from '../../../services/auth'
import { Button } from '../button'
import { DropDownMenuDemo } from '../dropDownMenu'
import { Typography } from '../typography'

import s from './header.module.scss'
import { ProfileBlock } from './profile-block'

type HeaderProps = {
  isAuth: boolean
}
export const Header: FC<HeaderProps> = ({ isAuth }) => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }
  const dropDownMenu = [
    { id: 1, component: <ProfileBlock /> },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Profile />
          <Typography variant={'caption'}>My Profile</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={logoutHandler}>
          <Logout />
          <Typography variant={'caption'}>Sign Out</Typography>
        </Button>
      ),
    },
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
          <DropDownMenuDemo items={dropDownMenu} trigger={<Avatar />} />
        </div>
      )}
    </div>
  )
}
