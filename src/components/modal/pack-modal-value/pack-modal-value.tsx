import { modalActions, selectSettings, useAppDispatch, useAppSelector } from '../../../services'
import { CheckBox, TextField } from '../../ui'

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
