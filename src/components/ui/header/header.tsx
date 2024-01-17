import {FC} from 'react'

import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {Logout, Profile, useMutationWithToast} from '../../../common'
import {ResponseUserType, useLogoutMutation} from '../../../services'
import {AvatarDemo} from '../avatar'
import {Button} from '../button'
import {DropDownMenuDemo} from '../dropDownMenu'
import {Typography} from '../typography'

import s from './header.module.scss'
import {ProfileBlock} from './profile-block'

type HeaderProps = {
  data?: ResponseUserType | null
}
export const Header: FC<HeaderProps> = ({ data }) => {
  const [logout] = useLogoutMutation()
  const hookWithToast = useMutationWithToast()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    if (!navigator.onLine) {
      toast.error("Can't perform logout while offline")

      return
    }
    const result = await hookWithToast(logout(), 'Всего хорошего')

    if (result?.success) {
      navigate('/login')
    }
  }

  const dropDownMenu = [
    { id: 1, component: <ProfileBlock data={data} /> },
    {
      id: 2,
      component: (
        <Button as={Link} to={'/profile'} variant={'link'} className={s.buttonDrop}>
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
      <div className={s.contentHeader}>
        <div className={s.logoBlock}>
          <Button aria-label={'to-main-page'} as={Link} to="/" variant={'link'} className={s.logo}>
            <Typography variant={'h1'}>CARDS</Typography>
          </Button>
          {/*<LanguageTheme />*/}
        </div>

        {!data && <Button variant={'primary'}>Sign In</Button>}
        {data && (
          <div className={s.avatar_menu}>
            <Link to={`/profile`} className={s.link}>
              <Typography variant={'subtitle1'} className={s.menu_name}>
                {data.name}
              </Typography>
            </Link>
            <DropDownMenuDemo
              items={dropDownMenu}
              trigger={<AvatarDemo src={data.avatar} name={data.name} />}
            />
          </div>
        )}
      </div>
    </div>
  )
}
