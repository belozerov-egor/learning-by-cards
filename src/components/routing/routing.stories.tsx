import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import { Routing } from './routing.tsx'

const meta = {
  title: 'App',
  component: Routing,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Routing>

export default meta

type Story = StoryObj<typeof meta>

export const RoutingStory: Story = {}
