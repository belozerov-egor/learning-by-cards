import { useMemo, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Back, Edit, Play, SubMenu, Trash } from '../../common'
import {
  Button,
  DropDownMenuDemo,
  Loader,
  Pagination,
  SelectDemo,
  Sort,
  AddEditPackModal,
  TextField,
  Typography,
  CardAddEditModal,
} from '../../components'
import { DeletePackCardModal } from '../../components/modal/delete-modal/delete-pack-card-modal.tsx'
import {
  modalActions,
  NameModal,
  selectOpen,
  selectSettings,
  useAppDispatch,
  useAppSelector,
  useCreateCardMutation,
  useDeleteCardMutation,
  useDeletedDeckMutation,
  useEditCardMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useUpdateDeckMutation,
} from '../../services'

import { MyPackTable } from './my-pack-table'
import s from './my-pack.module.scss'

export const MyPack = () => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { privatePack, packName, question, answer } = useAppSelector(selectSettings)
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)
  const open = useAppSelector(selectOpen)
  const dispatch = useAppDispatch()

  const [cardId, setCardId] = useState<string>('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const [perPage, setPerPage] = useState({ id: 1, value: itemsPerPage })
  const [page, setPage] = useState(currentPage)

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data } = useGetDeckQuery({
    id: params.id,
  })
  const { data: dataCards, isLoading } = useGetCardsQuery({
    id: params.id,
    question: search,
    orderBy: sortedString,
    itemsPerPage: perPage.value,
    currentPage: page,
  })
  const [createCard] = useCreateCardMutation()
  const [editItem] = useEditCardMutation()
  const [deleteItem] = useDeleteCardMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const openPackModal = (value: NameModal) => {
    dispatch(modalActions.setOpenModal(value))
    dispatch(modalActions.setPackName(data!.name))
    dispatch(modalActions.setPrivatePack(data!.isPrivate))
    setCardId(data!.id)
  }
  const onSetPerPageHandler = (value: number) => {
    setPerPage({ ...perPage, value })
  }
  const addCardModalHandler = () => {
    dispatch(modalActions.setOpenModal('addCard'))
  }
  const addOrEditCard = () => {
    if (open === 'addCard') {
      createCard({ id: params.id, question, answer })
    } else if (open === 'editCard') {
      editItem({ id: cardId, question, answer })
        .unwrap()
        .then(() => toast.success('Карточка успешна обновлена'))
        .catch(() => {
          toast.error('Some error')
        })
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }

  const deleteCardOrPack = () => {
    if (open === 'deleteCard') {
      deleteItem({ id: cardId })
    } else if (open === 'editPack') {
      editDeck({ id: cardId, name: packName, isPrivate: privatePack })
        .unwrap()
        .then(() => {
          toast.success('Колода успешно обновлена')
        })
        .catch(() => {
          toast.error('Some error')
        })
    } else if (open === 'deletePack') {
      deleteDeck({ id: cardId })
        .unwrap()
        .then(() => {
          toast.success('Карта успешно удалена')
        })
        .catch(() => {
          toast.error('Some error')
        })

      navigate('/')
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }

  const editPack = () => {
    editDeck({ id: cardId, name: packName, isPrivate: privatePack })
      .unwrap()
      .then(() => {
        toast.success('Колода успешно обновлена')
      })
      .catch(() => {
        toast.error('Some error')
      })
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
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

  if (isLoading) return <Loader />

  return (
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
        value={search}
        onChangeText={event => setSearch(event)}
        type={'searchType'}
        className={s.textField}
      />
      <MyPackTable dataCards={dataCards} sort={sort} setSort={setSort} setCardId={setCardId} />
      <CardAddEditModal onSubmit={addOrEditCard} />
      <AddEditPackModal onSubmit={editPack} />
      <DeletePackCardModal onSubmit={deleteCardOrPack} />
      <div className={s.pagination}>
        <Pagination count={dataCards?.pagination.totalPages} page={page} onChange={setPage} />
        <Typography variant={'body2'}>Показать</Typography>
        <SelectDemo
          options={options}
          defaultValue={perPage.value}
          onValueChange={onSetPerPageHandler}
          className={s.selectPagination}
        />
        <Typography variant={'body2'}>На странице</Typography>
      </div>
    </div>
  )
}
