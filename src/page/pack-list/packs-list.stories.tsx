import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../common'

import { PacksList } from './packs-list.tsx'

const meta = {
  title: 'Page/PacksList',
  component: PacksList,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof PacksList>

export default meta
type Story = StoryObj<typeof meta>

export const PackListStory: Story = {}
