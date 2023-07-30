import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from './'

const meta = {
  title: 'Components/Checkbox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'withText'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const ShowCheckbox: Story = {
  args: {
    variant: 'default',
  },
}

export const DisabledCheckbox: Story = {
  args: {
    checked: true,
    isDisabled: true,
    variant: 'default',
  },
}

export const CheckboxWithText: Story = {
  args: {
    checked: false,
    variant: 'withText',
    checkBoxText: 'Test',
  },
}

export const DisabledCheckboxWithText: Story = {
  args: {
    checked: false,
    variant: 'withText',
    isDisabled: true,
    checkBoxText: 'Test',
  },
}
