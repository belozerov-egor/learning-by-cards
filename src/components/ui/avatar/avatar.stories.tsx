import type { Meta, StoryObj } from '@storybook/react'

import AvatarInCard from '../../../common/assets/img/avatar-default.svg'

import { AvatarDemo } from './avatar.tsx'

const meta = {
  title: 'Components/Avatar',
  component: AvatarDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: AvatarInCard,
  },
}
