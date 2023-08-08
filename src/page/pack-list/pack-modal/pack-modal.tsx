import { FC } from 'react'

import { CheckBox, Modal, TextField } from '../../../components'
import { ModalType } from '../types.ts'

type PropsType = {
  open: ModalType
  packName: string
  handleClose: (value: string) => void
  handleCreateClicked: () => void
  setPackName: (value: string) => void
  privatePack: boolean
  setPrivatePack: (value: boolean) => void
}

export const PackModal: FC<PropsType> = props => {
  const {
    open,
    packName,
    handleClose,
    handleCreateClicked,
    setPackName,
    privatePack,
    setPrivatePack,
  } = props

  return (
    <Modal
      title={open.addNewPack ? 'Add New Pack' : 'Edit Pack'}
      showCloseButton={true}
      open={open.addNewPack ? open.addNewPack : open.editPack}
      onClose={open.addNewPack ? () => handleClose('addNewPack') : () => handleClose('editPack')}
      titleButton={open.addNewPack ? 'Add New Pack' : 'Save Changes'}
      disableButton={!packName}
      callBack={handleCreateClicked}
    >
      <TextField
        type={'default'}
        value={open.editPack ? packName : ''}
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
    </Modal>
  )
}
