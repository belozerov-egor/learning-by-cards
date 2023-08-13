import { useMemo, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { Back, Edit, Play, SubMenu, Trash } from '../../common'
import { Button, DropDownMenuDemo, Sort, TableModal, TextField, Typography } from '../../components'
import {
  modalActions,
  NameModal,
  selectOpenModals,
  selectSettings,
  useAppDispatch,
  useAppSelector,
  useCreateCardMutation,
  useDeletedDeckMutation,
  useGetDeckQuery,
  useUpdateDeckMutation,
} from '../../services'
import { useDeleteCardMutation, useEditCardMutation, useGetCardsQuery } from '../../services/cards'

import { MyPackTable } from './my-pack-table/my-pack-table.tsx'
import s from './my-pack.module.scss'

export const MyPack = () => {
  const params = useParams<{ id: string }>()
  const [cardId, setCardId] = useState<string>('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  // const [perPage, setPerPage] = useState({ id: 1, value: itemsPerPage })
  // const [page, setPage] = useState(currentPage)
  const { editPack, deletePack, addCard, editCard, deleteCard } = useAppSelector(selectOpenModals)
  const { privatePack, packName, question, answer } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const onSetPerPageHandler = (value: number) => {
  //   setPerPage({ ...perPage, value })
  // }
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data } = useGetDeckQuery({
    id: params.id,
  })
  const { data: dataCards } = useGetCardsQuery({
    id: params.id,
    orderBy: sortedString,
  })
  const [createCard] = useCreateCardMutation()
  const [editItem] = useEditCardMutation()
  const [deleteItem] = useDeleteCardMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const openPackModal = (value: NameModal) => {
    dispatch(modalActions.setOpenModal(value))
    dispatch(modalActions.setPackName(data!.name))
    setCardId(data!.id)
  }

  const addCardModalHandler = () => {
    dispatch(modalActions.setOpenModal('addCard'))
  }

  const onHandlerActionClicked = () => {
    if (addCard) {
      createCard({ id: params.id, question, answer })
      dispatch(modalActions.setCloseModal('addCard'))
      dispatch(modalActions.setQuestion(''))
      dispatch(modalActions.setAnswer(''))
    } else if (editCard) {
      editItem({ id: cardId, question, answer })
      dispatch(modalActions.setCloseModal('editCard'))
      dispatch(modalActions.setQuestion(''))
      dispatch(modalActions.setAnswer(''))
    } else if (deleteCard) {
      deleteItem({ id: cardId })
      dispatch(modalActions.setCloseModal('deleteCard'))
    } else if (editPack) {
      editDeck({ id: cardId, name: packName, isPrivate: privatePack })
      dispatch(modalActions.setCloseModal('editPack'))
      dispatch(modalActions.setPackName(''))
      dispatch(modalActions.setPrivatePack(false))
    } else if (deletePack) {
      deleteDeck({ id: cardId })
      navigate('/')
      dispatch(modalActions.setCloseModal('deletePack'))
      dispatch(modalActions.setPackName(''))
    }
  }

  const dropDownMenu = [
    {
      id: 1,
      component: (
        <Button as={Link} to={`/learn-pack/${params.id}`} variant={'link'} className={s.buttonDrop}>
          <Play />
          <Typography variant={'caption'}>Learn</Typography>
        </Button>
      ),
    },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={() => openPackModal('editPack')}>
          <Edit />
          <Typography variant={'caption'}>Edit</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button
          variant={'link'}
          className={s.buttonDrop}
          onClick={() => openPackModal('deletePack')}
        >
          <Trash />
          <Typography variant={'caption'}>Delete</Typography>
        </Button>
      ),
    },
  ]

  // const setSearchByName = (event: string) => {
  //   setQuestion(event)
  // }

  return (
    <>
      <div className={s.myPackBlock}>
        <Button as={Link} to="/" variant={'link'} className={s.backButton}>
          <Back />
          Back to Packs List
        </Button>
        <div className={s.headBlock}>
          <div className={s.titleMenu}>
            <Typography variant={'large'}>{data?.name}</Typography>
            <DropDownMenuDemo items={dropDownMenu} trigger={<SubMenu />} />
          </div>
          <Button variant={'primary'} onClick={addCardModalHandler}>
            Add New Card
          </Button>
        </div>
        <TextField
          value={''}
          // onChangeText={event => setSearchByName(event)}
          type={'searchType'}
          className={s.textField}
        />
        <MyPackTable dataCards={dataCards} sort={sort} setSort={setSort} setCardId={setCardId} />
        <TableModal handleClicked={onHandlerActionClicked} />
      </div>
    </>
  )
}
