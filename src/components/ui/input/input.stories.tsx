import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'password', 'search'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: '123',
    type: 'password',
  },
}
export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: '123',
    type: 'search',
  },
}
