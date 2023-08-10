import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Back } from '../../common'
import { Button, TextField, Typography } from '../../components'
import { useGetCardsQuery } from '../../services/cards'
import { useGetDeckQuery } from '../../services/decks'

import s from './friends-pack.module.scss'
import { TableFriendsPack } from './friends-table/table-friends-pack.tsx'

export const FriendsPack = () => {
  const params = useParams<{ id: string }>()
  const [sortTable, setSortTable] = useState(false)
  const { data } = useGetDeckQuery({
    id: params.id,
  })

  const { data: dataCards } = useGetCardsQuery({
    id: params.id,
  })

  return (
    <div className={s.packListBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleMenu}>
          <Typography variant={'large'}>{data?.name}</Typography>
        </div>
        <Button variant={'primary'}>Learn to Pack</Button>
      </div>
      <TextField
        value={'question'}
        // onChangeText={event => setSearchByName(event)}
        type={'searchType'}
        className={s.textField}
      />
      <TableFriendsPack dataCards={dataCards} sortTable={sortTable} setSortTable={setSortTable} />
    </div>
  )
}
