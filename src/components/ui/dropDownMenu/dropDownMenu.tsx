import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Avatar } from '../../../common/assets/img'

import s from './dropDownMenu.module.scss'

type DropDownMenuPropsType = {
  trigger?: ReactNode
}

export const DropDownMenuDemo: FC<DropDownMenuPropsType> = () => {
  return (
    <DropdownMenu.Root>
      <div className={s.dropDownBlock}>
        <DropdownMenu.Trigger asChild>
          <button className={s.iconButton} aria-label="Customise options">
            <Avatar />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.dropdownMenuContent} sideOffset={5}>
            <DropdownMenu.Item className={s.dropdownMenuItem}>
              <Avatar />{' '}
              <div>
                <span>name</span>
                <span>email</span>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
            <DropdownMenu.Item className="DropdownMenuItem">
              New Window <div className="RightSlot">⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
            <DropdownMenu.Item className="DropdownMenuItem" disabled>
              New Private Window <div className="RightSlot">⇧+⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className={s.dropdownMenuArrow} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  )
}
