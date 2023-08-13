import { useMemo, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Back } from '../../common'
import { Button, Pagination, SelectDemo, Sort, TextField, Typography } from '../../components'
import { useAppSelector, useGetCardsQuery, useGetDeckQuery } from '../../services'

import s from './friends-pack.module.scss'
import { FriendsTable } from './friends-table/table-friends-pack.tsx'

export const FriendsPack = () => {
  const params = useParams<{ id: string }>()

  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)

  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState({ id: 1, value: itemsPerPage })
  const [page, setPage] = useState(currentPage)
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })

  const onSetPerPageHandler = (value: number) => {
    setPerPage({ ...perPage, value })
  }
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
    question: search,
    itemsPerPage: perPage.value,
    currentPage: page,
  })

  return (
    <div className={s.friendsPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleMenu}>
          <Typography variant={'large'}>{data?.name}</Typography>
        </div>
        <Button as={Link} to={`/learn-pack/${params.id}`} variant={'primary'}>
          Learn to Pack
        </Button>
      </div>
      <TextField
        value={search}
        onChangeText={e => setSearch(e)}
        type={'searchType'}
        className={s.textField}
      />
      <FriendsTable sort={sort} setSort={setSort} dataCards={dataCards} />
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
