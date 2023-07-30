import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Avatar } from '../../../common'
import { Typography } from '../typography'

import s from './dropDownMenu.module.scss'

type DropDownMenuPropsType = {
  trigger?: ReactNode
  items?: {
    id: number
    component: JSX.Element
  }[]
}

export const DropDownMenuDemo: FC<DropDownMenuPropsType> = ({ items }) => {
  const itemsForRender = items?.map((item, index) => {
    return (
      <>
        {index === items?.length - 1 ? (
          <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
        ) : (
          <>
            <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
            <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
          </>
        )}
      </>
    )
  })

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.iconButton} aria-label="Customise options">
          <Avatar />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.dropdownMenuContent} sideOffset={5}>
          {itemsForRender}
          {/*<DropdownMenu.Item className={s.dropdownMenuItem}>*/}
          {/*  <ProfileBlock />*/}
          {/*</DropdownMenu.Item>*/}
          {/*<DropdownMenu.Separator className={s.dropdownMenuSeparator} />*/}
          {/*<DropdownMenu.Item className={s.dropdownMenuItem}>*/}
          {/*  <div className={s.dropdownMenuItemContent}>*/}
          {/*    <Profile />*/}
          {/*    <Typography variant={'caption'}>My Profile</Typography>*/}
          {/*  </div>*/}
          {/*</DropdownMenu.Item>*/}
          {/*<DropdownMenu.Separator className={s.dropdownMenuSeparator} />*/}
          {/*<DropdownMenu.Item className={s.dropdownMenuItem}>*/}
          {/*  <div className={s.dropdownMenuItemContent}>*/}
          {/*    <Logout />*/}
          {/*    <Typography variant={'caption'}>Sign out</Typography>*/}
          {/*  </div>*/}
          {/*</DropdownMenu.Item>*/}
          <DropdownMenu.Arrow className={s.arrowBox} asChild>
            <div className={s.arrow} />
          </DropdownMenu.Arrow>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export const ProfileBlock = () => {
  return (
    <div className={s.dropdownMenuItemInfo}>
      <Avatar />
      <div className={s.info}>
        <Typography variant={'subtitle2'}>Name</Typography>
        <Typography variant={'caption'} className={s.email}>
          egor.belozerov@mail.ru
        </Typography>
      </div>
    </div>
  )
}
