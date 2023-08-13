import { FC } from 'react'

import {
  modalActions,
  NameModal,
  selectOpenModals,
  selectSettings,
  useAppDispatch,
  useAppSelector,
} from '../../../services'
import { Modal, Typography } from '../../ui'
import { CardModalValue } from '../card-modal-value'
import { PackModalValue } from '../pack-modal-value'

import s from './table-modal.module.scss'

type PropsType = {
  handleClicked: (value: NameModal) => void
}

export const TableModal: FC<PropsType> = props => {
  const { handleClicked } = props
  const { addPack, editPack, deletePack, addCard, editCard, deleteCard } =
    useAppSelector(selectOpenModals)

  const { packName, question } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  const setClose = (value: NameModal) => {
    dispatch(modalActions.setCloseModal(value))
    dispatch(modalActions.setClearState({}))
  }

  let onCloseHandler
  let title
  let titleButton
  let callbackClicked

  switch (true) {
    case addPack:
      onCloseHandler = () => setClose('addPack')
      title = 'Add New Pack'
      titleButton = 'Add New Pack'
      callbackClicked = () => handleClicked('addPack')
      break
    case editPack:
      onCloseHandler = () => setClose('editPack')
      title = 'Edit Pack'
      titleButton = 'Save Changes'
      callbackClicked = () => handleClicked('editPack')
      break
    case deletePack:
      onCloseHandler = () => setClose('deletePack')
      title = 'Delete Pack'
      titleButton = 'Delete Pack'
      callbackClicked = () => handleClicked('deletePack')
      break
    case addCard:
      onCloseHandler = () => setClose('addCard')
      title = 'Add Card'
      titleButton = 'Add Card'
      callbackClicked = () => handleClicked('addCard')
      break
    case editCard:
      onCloseHandler = () => setClose('editCard')
      title = 'Edit Card'
      titleButton = 'Edit Card'
      callbackClicked = () => handleClicked('editCard')
      break
    case deleteCard:
      onCloseHandler = () => setClose('deleteCard')
      title = 'Delete Card'
      titleButton = 'Delete Card'
      callbackClicked = () => handleClicked('deleteCard')
      break
    default:
      title = 'Name Pack'
      titleButton = 'Button Name'
      break
  }

  return (
    <Modal
      title={title}
      showCloseButton={true}
      open={addPack || editPack || deletePack || addCard || editCard || deleteCard}
      onClose={onCloseHandler}
      titleButton={titleButton}
      callBack={callbackClicked}
    >
      {deleteCard || deletePack ? (
        <Typography variant={'body1'}>
          Do you really want to remove{' '}
          <Typography variant={'subtitle1'} className={s.packName}>
            {deletePack ? packName : question}?
          </Typography>{' '}
          <br />
          All cards will be deleted.
        </Typography>
      ) : (
        <>
          {(addPack || editPack) && <PackModalValue />}
          {(addCard || editCard) && <CardModalValue />}
        </>
      )}
    </Modal>
  )
}
