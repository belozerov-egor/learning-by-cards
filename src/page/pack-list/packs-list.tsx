import { useState } from 'react'

import { Trash, useDebounce, useMutationWithToast } from '../../common'
import {
  AddEditPackModal,
  Button,
  DeletePackCardModal,
  Pagination,
  SelectDemo,
  SliderDemo,
  TabSwitcher,
  TextField,
  Typography,
} from '../../components'
import {
  cardsSlice,
  deckSlice,
  modalActions,
  selectOpen,
  selectPackSettings,
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
  const itemsPerPage = useAppSelector(state => state.deckSlice.currentPerPage.packList)
  const sliderValues = useAppSelector(state => state.deckSlice.slider)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage.packList)
  const open = useAppSelector(selectOpen)
  const { privatePack, packName, img } = useAppSelector(selectPackSettings)
  const hookWithToast = useMutationWithToast()
  const [activeTab, setActiveTab] = useState(tabSwitcherOptions[1].value)
  const dispatch = useAppDispatch()

  const {
    cardId,
    setCardId,
    userId,
    setUserId,
    sort,
    setSort,
    sortedString,
    setValueSlider,
    valueSlider,
  } = usePackDeckState(sliderValues)

  const newInitialName = useDebounce(initialName, 1000)

  const { data: meData } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: newInitialName,
    orderBy: sortedString,
    itemsPerPage: itemsPerPage.value,
    authorId: userId,
    minCardsCount: valueSlider[0],
    maxCardsCount: valueSlider[1],
    currentPage,
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const setNewCurrentPage = (page: number) => {
    dispatch(deckSlice.actions.setCurrentPage({ value: 'packList', newCurrentPage: page }))
  }
  const setNewPerPage = (value: number) => {
    dispatch(deckSlice.actions.setItemsPerPage({ value: 'packList', newCurrentPage: value }))
  }
  const setSearchByName = (event: string) => {
    dispatch(deckSlice.actions.setSearchByName(event))
  }
  const setIsMyPackHandler = (value: boolean) => {
    dispatch(cardsSlice.actions.setIsMyPack({ isMyPack: value }))
  }
  const handleTabSort = (value: string) => {
    setActiveTab(value)
    if (value === 'My Cards') {
      setUserId(meData!.id)
      dispatch(deckSlice.actions.setCurrentPage({ value: 'packList', newCurrentPage: 1 }))
    } else {
      setUserId('')
    }
  }
  const clearFilterData = () => {
    setSearchByName('')
    handleTabSort('All Cards')
    setActiveTab('All Cards')
    setValueSlider([sliderValues.minValue, sliderValues.maxValue])
    setSort({ key: 'updated', direction: 'asc' })
  }
  const addOrEditPack = async () => {
    if (open === 'addPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))
      img && formData.append('cover', img)

      await hookWithToast(createDeck(formData), 'Колода успешно добавлена')
    } else if (open === 'editPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))
      img && formData.append('cover', img)

      await hookWithToast(editDeck({ id: cardId, formData }), 'Колода успешно обновлена')
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const deletePack = async () => {
    await hookWithToast(deleteDeck({ id: cardId }), 'Колода успешно удалена')

    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
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
          placeholder={'Type to find...'}
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
            classname={s.switcher}
            activeTab={activeTab}
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
        <Pagination
          count={data?.pagination.totalPages}
          page={currentPage}
          onChange={setNewCurrentPage}
        />
        <Typography variant={'body2'}>Показать</Typography>
        <SelectDemo
          options={options}
          defaultValue={itemsPerPage.value}
          onValueChange={setNewPerPage}
          className={s.selectPagination}
        />
        <Typography variant={'body2'}>На странице</Typography>
      </div>
      <AddEditPackModal onSubmit={addOrEditPack} />
      <DeletePackCardModal onSubmit={deletePack} />
    </div>
  )
}
