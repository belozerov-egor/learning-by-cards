import { FC } from 'react'

import {
  modalActions,
  selectOpen,
  selectSettings,
  useAppDispatch,
  useAppSelector,
} from '../../../services'
import { Modal, TextField } from '../../ui'

type PropsType = {
  onSubmit: () => void
}
export const CardAddEditModal: FC<PropsType> = ({ onSubmit }) => {
  const open = useAppSelector(selectOpen)
  const { question, answer } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()
  const setClose = () => {
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  let openModal
  let title
  let titleButton

  if (open === 'addCard') {
    openModal = open === 'addCard'
    title = 'Add New Card'
    titleButton = 'Add New Card'
  } else if (open === 'editCard') {
    openModal = open === 'editCard'
    title = 'Edit Card'
    titleButton = 'Save Changes'
  }
  const setQuestion = (value: string) => {
    dispatch(modalActions.setQuestion(value))
  }
  const setAnswer = (value: string) => {
    dispatch(modalActions.setAnswer(value))
  }

  return (
    <Modal
      title={title}
      showCloseButton={true}
      open={openModal}
      onClose={setClose}
      titleButton={titleButton}
      callBack={onSubmit}
    >
      <TextField
        type={'default'}
        value={question}
        label={'Question'}
        placeholder={'Question'}
        onChangeText={e => setQuestion(e)}
      />
      <TextField
        type={'default'}
        value={answer}
        label={'Answer'}
        placeholder={'Answer'}
        onChangeText={e => setAnswer(e)}
      />
    </Modal>
  )
}
