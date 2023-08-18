import { Link, useNavigate, useParams } from 'react-router-dom'

import { Back } from '../../common'
import { AddEditCardModal, Button, Typography } from '../../components'
import {
  modalActions,
  selectCardSettings,
  useAppDispatch,
  useAppSelector,
  useCreateCardMutation,
} from '../../services'

import s from './empty-pack.module.scss'

export const EmptyPack = () => {
  const [createCard] = useCreateCardMutation()
  const navigate = useNavigate()
  const params = useParams()
  const { question, answer, questionImg, answerImg } = useAppSelector(selectCardSettings)
  const dispatch = useAppDispatch()

  const setOpen = () => {
    dispatch(modalActions.setOpenModal('addCard'))
  }

  const addCardHandler = () => {
    const formData = new FormData()

    formData.append('question', question)
    formData.append('answer', answer)

    questionImg && formData.append('questionImg', questionImg)
    answerImg && formData.append('answerImg', answerImg)
    createCard({ id: params.id, formData })
    navigate(`/my-pack/${params.id}`)
    dispatch(modalActions.setCloseModal('addCard'))
    dispatch(modalActions.setQuestion(''))
    dispatch(modalActions.setAnswer(''))
  }

  return (
    <div className={s.emptyPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <Typography variant={'large'} className={s.title}>
        {params.name}
      </Typography>
      <Typography variant={'body1'} className={s.description}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      <div className={s.addNewPackButton}>
        <Button variant={'primary'} onClick={setOpen}>
          Add New Card
        </Button>
      </div>
      <AddEditCardModal onSubmit={addCardHandler} />
    </div>
  )
}
