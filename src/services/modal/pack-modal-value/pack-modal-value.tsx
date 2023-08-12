import { CheckBox, TextField } from '../../../components'
import { useAppDispatch, useAppSelector } from '../../store.ts'
import { modalActions } from '../modal.slice.ts'
import { selectSettings } from '../selectors.ts'

export const PackModalValue = () => {
  const { packName, privatePack } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()
  const setPackName = (value: string) => {
    dispatch(modalActions.setPackName(value))
  }
  const setPrivatePack = (value: boolean) => {
    dispatch(modalActions.setPrivatePack(value))
  }

  return (
    <>
      <TextField
        type={'default'}
        value={packName}
        label={'Name Pack'}
        placeholder={'name'}
        onChangeText={e => setPackName(e)}
      />
      <CheckBox
        variant={'withText'}
        checkBoxText={'Private pack'}
        checked={privatePack}
        onChange={() => setPrivatePack(!privatePack)}
      />
    </>
  )
}
