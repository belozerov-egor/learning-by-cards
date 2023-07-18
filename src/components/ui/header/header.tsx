import { Logo } from '../../../common/assets/img'
import { Button } from '../button'

import s from './header.module.scss'
export const Header = () => {
  return (
    <div className={s.headerBlock}>
      <div className={s.logoBlock}>
        <Logo />
      </div>
      <>
        <Button variant={'primary'}>Sign In</Button>
      </>
    </div>
  )
}
