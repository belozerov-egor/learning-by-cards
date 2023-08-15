import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../../common'

import { PersonalInformation } from './personal-information.tsx'

const meta = {
  title: 'Auth/PersonalInformation',
  component: PersonalInformation,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalCard: Story = {
  args: {
    name: 'Ivan',
    email: 'egorbelozerov@mail.ru',
    avatar: '',
    update: () => {},
    userId: '',
    isEmailVer: false,
  },
}
