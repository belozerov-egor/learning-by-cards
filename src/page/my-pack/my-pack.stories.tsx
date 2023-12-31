import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../common'

import { MyPack } from './my-pack.tsx'

const meta = {
  title: 'Page/MyPack',
  component: MyPack,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof MyPack>

export default meta
type Story = StoryObj<typeof meta>

export const MyPackStory: Story = {}
