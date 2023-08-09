import { FC } from 'react'

import { CheckBox, Modal, TextField, Typography } from '../../../components'
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

  let onCloseHandler

  if (open.addNewPack) {
    onCloseHandler = () => handleClose('addNewPack')
  } else if (open.editPack) {
    onCloseHandler = () => handleClose('editPack')
  } else {
    onCloseHandler = () => handleClose('deletePack')
  }

  return (
    <Modal
      title={
        (open.addNewPack && 'Add New Pack') ||
        (open.editPack && 'Edit Pack') ||
        (open.deletePack && 'Delete Pack') ||
        'Name Pack'
      }
      showCloseButton={true}
      open={open.addNewPack || open.editPack || open.deletePack}
      onClose={onCloseHandler}
      titleButton={
        (open.addNewPack && 'Add New Pack') ||
        (open.editPack && 'Save Changes') ||
        (open.deletePack && 'Delete Pack') ||
        'Button Name'
      }
      disableButton={
        (!packName && (open.editPack || open.addNewPack)) || (open.deletePack && !!packName)
      }
      callBack={handleCreateClicked}
    >
      {open.addNewPack || open.editPack ? (
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
      ) : (
        <Typography>
          Do you really want to remove Pack Name? <br />
          All cards will be deleted.
        </Typography>
      )}
    </Modal>
  )
}
