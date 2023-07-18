import { useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export const CheckboxDemo = () => {
  const [check, setCheck] = useState<boolean>(false)

  return (
    <div>
      <Checkbox.Root
        onClick={() => setCheck(!check)}
        className={`${s.checkboxRoot} ${check ? s.active : s.unActive}`}
        defaultChecked
        id="c1"
        checked={check}
      >
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {/*<label className="Label" htmlFor="c1">*/}
      {/*  Accept terms and conditions.*/}
      {/*</label>*/}
    </div>
  )
}
