import { FC } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import { Typography } from '../typography'

import s from './tabSwitcher.module.scss'

type PropsType = {
  className?: string
  options?: any[]
  onChangeCallback?: (value: any) => void
  classname: string
}
export const TabSwitcher: FC<PropsType> = ({ options, onChangeCallback, className }) => {
  return (
    <Tabs.Root className={`${s.tabsRoot} `} onValueChange={onChangeCallback}>
      <Tabs.List className={s.tabsList}>
        {options?.map((tab, index) => {
          return (
            <Tabs.Trigger
              disabled={tab.isDisabled}
              className={`${s.tabsTrigger} ${className}`}
              value={tab.value}
              key={index}
            >
              <Typography className={'body1'}>{tab.value}</Typography>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
