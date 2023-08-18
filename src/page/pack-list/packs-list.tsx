import { Trash } from '../../common'
import useDebounce from '../../common/hooks/use-debounce.ts'
import {
  AddEditPackModal,
  Button,
  Pagination,
  SelectDemo,
  SliderDemo,
  TabSwitcher,
  TextField,
  Typography,
} from '../../components'
import { DeletePackCardModal } from '../../components/modal/delete-modal/delete-pack-card-modal.tsx'
import {
  cardsSlice,
  deckSlice,
  modalActions,
  selectOpen,
  selectSettings,
  useAppDispatch,
  useAppSelector,
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useGetDecksQuery,
  useMeQuery,
  useUpdateDeckMutation,
} from '../../services'

import { usePackDeckState } from './hook'
import { TablePacksList } from './pack-table'
import s from './packs-list.module.scss'

export const PacksList = () => {
  const initialName = useAppSelector(state => state.deckSlice.searchByName)
  const tabSwitcherOptions = useAppSelector(state => state.deckSlice.tabSwitcherOptions)
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const sliderValues = useAppSelector(state => state.deckSlice.slider)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)
  const open = useAppSelector(selectOpen)
  const { privatePack, packName, img } = useAppSelector(selectSettings)

  const dispatch = useAppDispatch()

  const newInitialName = useDebounce(initialName, 1000)

  const {
    cardId,
    setCardId,
    userId,
    setUserId,
    sort,
    setSort,
    sortedString,
    page,
    setPage,
    setValueSlider,
    valueSlider,
    perPage,
    onSetPerPageHandler,
  } = usePackDeckState(sliderValues, currentPage, itemsPerPage)

  const { data: meData } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: newInitialName,
    orderBy: sortedString,
    itemsPerPage: perPage.value,
    authorId: userId,
    minCardsCount: valueSlider[0],
    maxCardsCount: valueSlider[1],
    currentPage: page,
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const setSearchByName = (event: string) => {
    dispatch(deckSlice.actions.setSearchByName(event))
  }

  const addOrEditPack = () => {
    if (open === 'addPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))

      img && formData.append('cover', img)
      createDeck(formData)
    } else if (open === 'editPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))

      img && formData.append('cover', img)
      editDeck({ id: cardId, formData })
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const deletePack = () => {
    deleteDeck({ id: cardId })
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }

  const setIsMyPackHandler = (value: boolean) => {
    dispatch(cardsSlice.actions.setIsMyPack({ isMyPack: value }))
  }
  const handleTabSort = (value: string) => {
    if (value === 'My Cards') {
      setUserId(meData!.id)
    } else {
      setUserId('')
    }
  }

  const clearFilterData = () => {
    setSearchByName('')
    handleTabSort('All cards')
    setValueSlider([sliderValues.minValue, sliderValues.maxValue])
    setSort({ key: 'updated', direction: 'asc' })
  }

  const setOpen = () => {
    dispatch(modalActions.setOpenModal('addPack'))
  }

  return (
    <div className={s.packListBlock}>
      <div className={s.headBlock}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'} onClick={setOpen}>
          Add New Pack
        </Button>
      </div>
      <div className={s.settingsBlock}>
        <TextField
          value={initialName}
          type={'searchType'}
          className={s.textField}
          onChangeText={event => setSearchByName(event)}
          onSearchClear={() => setSearchByName('')}
        />
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Show packs cards
          </Typography>
          <TabSwitcher
            onChangeCallback={value => handleTabSort(value)}
            options={tabSwitcherOptions}
            className={s.switcher}
            defaultValue={tabSwitcherOptions[1].value}
          />
        </div>
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Number of cards
          </Typography>
          <SliderDemo
            value={valueSlider}
            setValue={setValueSlider}
            maxValue={data?.maxCardsCount}
          />
        </div>
        <Button variant={'secondary'} onClick={clearFilterData}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <TablePacksList
        data={data}
        authData={meData}
        setIsMyPackHandler={setIsMyPackHandler}
        setCardId={setCardId}
        sort={sort}
        setSort={setSort}
      />
      <div className={s.pagination}>
        <Pagination count={data?.pagination.totalPages} page={page} onChange={setPage} />
        <Typography variant={'body2'}>Показать</Typography>
        <SelectDemo
          options={options}
          defaultValue={perPage.value}
          onValueChange={onSetPerPageHandler}
          className={s.selectPagination}
        />
        <Typography variant={'body2'}>На странице</Typography>
      </div>
      <AddEditPackModal onSubmit={addOrEditPack} />
      <DeletePackCardModal onSubmit={deletePack} />
    </div>
  )
}
