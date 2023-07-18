import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxDemo } from './'

const meta = {
  title: 'Components/CheckboxDemo',
  component: CheckboxDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const ShowCheckbox: Story = {}
