import { FC, useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import { Typography } from '../typography'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  isDisabled?: boolean
  checked?: boolean
  variant: 'default' | 'withText'
  checkBoxText?: string
  onChange?: (checked: boolean) => void
}

export const CheckBox: FC<CheckboxProps> = ({
  isDisabled = false,
  checked,
  checkBoxText,
  onChange,
}) => {
  const [check, setCheck] = useState<boolean | undefined>(checked)

  return (
    <div className={s.checkBoxBlock}>
      <Checkbox.Root
        onClick={() => setCheck(!check)}
        className={`${s.checkboxRoot} ${check ? s.active : s.unActive}`}
        onCheckedChange={onChange}
        defaultChecked
        id="c1"
        checked={check}
        disabled={isDisabled}
      >
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {checkBoxText && (
        <label className={`${s.label} ${isDisabled ? s.labelDisabled : ''}`} htmlFor="c1">
          <Typography variant={'body2'}>{checkBoxText}</Typography>
        </label>
      )}
    </div>
  )
}
