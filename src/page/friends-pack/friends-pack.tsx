import { useMemo, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Back } from '../../common'
import {
  Button,
  Loader,
  Pagination,
  SelectDemo,
  Sort,
  TextField,
  Typography,
} from '../../components'
import {
  deckSlice,
  useAppDispatch,
  useAppSelector,
  useGetCardsQuery,
  useGetDeckQuery,
} from '../../services'

import s from './friends-pack.module.scss'
import { FriendsTable } from './friends-table/table-friends-pack.tsx'

export const FriendsPack = () => {
  const params = useParams<{ id: string }>()

  const itemsPerPage = useAppSelector(state => state.deckSlice.currentPerPage.friendsPack)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage.friendsPack)
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data } = useGetDeckQuery({
    id: params.id,
  })
  const { data: dataCards, isLoading } = useGetCardsQuery({
    id: params.id,
    orderBy: sortedString,
    question: search,
    itemsPerPage: itemsPerPage.value,
    currentPage: currentPage,
  })

  const setNewCurrentPage = (page: number) => {
    dispatch(deckSlice.actions.setCurrentPage({ value: 'friendsPack', newCurrentPage: page }))
  }
  const setNewPerPage = (value: number) => {
    dispatch(deckSlice.actions.setItemsPerPage({ value: 'friendsPack', newCurrentPage: value }))
  }

  // eslint-disable-next-line react/jsx-no-undef
  if (isLoading) return <Loader />

  return (
    <div className={s.friendsPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleAndCover}>
          <div className={s.titleMenu}>
            <Typography variant={'large'}>{data?.name}</Typography>
          </div>
          {data?.cover && <img src={data.cover} alt="cover" className={s.cover} />}
        </div>
        <Button as={Link} to={`/learn-pack/${params.id}`} variant={'primary'}>
          Learn to Pack
        </Button>
      </div>
      <TextField
        value={search}
        placeholder={'Type to find...'}
        onChangeText={e => setSearch(e)}
        onSearchClear={() => setSearch('')}
        type={'searchType'}
        className={s.textField}
      />
      <FriendsTable sort={sort} setSort={setSort} dataCards={dataCards} />
      <div className={s.pagination}>
        <Pagination
          count={dataCards?.pagination.totalPages}
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
    </div>
  )
}
