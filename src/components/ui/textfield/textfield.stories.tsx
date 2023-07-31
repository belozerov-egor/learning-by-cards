import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './textField.tsx'

const meta = {
  title: 'Components/Textfield',
  component: TextField,
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'text changes' } },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const TextFieldDefault: Story = {
  args: {
    label: 'label',
    placeholder: 'Default',
    value: '',
    type: 'default',
    disableValue: false,
  },
}
export const TextFieldDefaultError: Story = {
  args: {
    placeholder: 'Default',
    type: 'default',
    value: '',
    disableValue: false,
    errorMessage: 'Error!',
  },
}
export const TextFieldPassword: Story = {
  args: {
    placeholder: 'Password',
    type: 'password',
    value: 'Password',
    disableValue: false,
  },
}
export const TextFieldPasswordError: Story = {
  args: {
    placeholder: 'Password',
    type: 'password',
    value: 'Some Error',
    disableValue: false,
    errorMessage: 'Error!',
  },
}
export const TextFieldSearch: Story = {
  args: {
    placeholder: 'Search',
    type: 'searchType',
    value: '',
    disableValue: false,
  },
}
export const TextFieldSearchError: Story = {
  args: {
    placeholder: 'Search',
    type: 'searchType',
    value: '',
    disableValue: false,
    errorMessage: 'Error!',
  },
}