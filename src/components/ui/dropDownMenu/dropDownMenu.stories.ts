import { Meta, StoryObj } from '@storybook/react'

import { DropDownMenuDemo } from './dropDownMenu.tsx'

const meta = {
  title: 'Components/DropDownMenuDemo',
  component: DropDownMenuDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenuDemo>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenu: Story = {}
