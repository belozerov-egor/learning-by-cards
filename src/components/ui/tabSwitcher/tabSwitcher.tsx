import * as Tabs from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'
const TabSwitcher = () => {
  const tabsName = [
    { name: 'My cards', value: 'Button1' },
    { name: 'All cards', value: 'Button2' },
  ]

  return (
    <Tabs.Root className={s.TabsRoot} defaultValue="tab1">
      <Tabs.List className={s.TabsList} aria-label="Manage your account">
        {tabsName.map(tab => {
          return (
            <Tabs.Trigger className={s.TabsTrigger} value={tab.value}>
              {tab.name}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
      <Tabs.Content className={s.TabsContent} value="tab1"></Tabs.Content>
      <Tabs.Content className={s.TabsContent} value="tab2"></Tabs.Content>
    </Tabs.Root>
  )
}

export default TabSwitcher
