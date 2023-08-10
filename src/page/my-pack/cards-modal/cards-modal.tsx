import { FC } from 'react'

import { Modal, TextField, Typography } from '../../../components'
import { ModalType } from '../../pack-list'

type PropsType = {
  open: ModalType
  cardSettings: any
  handleClose: (value: string) => void
  handleCreateClicked: () => void
  setPackName: (value: string) => void
  privatePack: boolean
  setPrivatePack: (value: boolean) => void
}

export const CardsModal: FC<PropsType> = props => {
  const { open, cardSettings, handleClose, handleCreateClicked, setPackName } = props

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
        (open.addNewPack && 'Add New Card') ||
        (open.editPack && 'Edit Card') ||
        (open.deletePack && 'Delete Card') ||
        'Name Pack'
      }
      showCloseButton={true}
      open={open.addNewPack || open.editPack || open.deletePack}
      onClose={onCloseHandler}
      titleButton={
        (open.addNewPack && 'Add New Card') ||
        (open.editPack && 'Save Changes') ||
        (open.deletePack && 'Delete Card') ||
        'Button Name'
      }
      disableButton={!cardSettings.question}
      callBack={handleCreateClicked}
    >
      {open.addNewPack || open.editPack ? (
        <>
          <TextField
            type={'default'}
            value={cardSettings.question}
            label={'Name Pack'}
            placeholder={'name'}
            onChangeText={e => setPackName(e)}
          />
          <TextField
            type={'default'}
            value={cardSettings.answer}
            label={'Name Pack'}
            placeholder={'name'}
            onChangeText={e => setPackName(e)}
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
