import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'

import { BrowserRouterDecorator } from '../../common/utils/decorator.tsx'

import { Routing } from './routing.tsx'

const meta = {
  title: 'App',
  component: Routing,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator],
} as Meta<typeof Routing>

export default meta

type Story = StoryObj<typeof meta>

export const RoutingStory: Story = {}

// Вот ваш компонент RoutingStory для тестирования роутов
