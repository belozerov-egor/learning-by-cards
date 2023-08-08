import { useState } from 'react'

import { Link } from 'react-router-dom'

import { ArrowDown, ArrowUp, Edit, Play, Trash } from '../../common'
import useDebounce from '../../common/hooks/use-debounce.ts'
import {
  Button,
  CheckBox,
  Modal,
  SliderDemo,
  TableElement,
  TabSwitcher,
  TextField,
  Typography,
} from '../../components'
import { useMeQuery } from '../../services/auth'
import { cardsSlice } from '../../services/cards'
import {
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '../../services/decks'
import { deckSlice } from '../../services/decks/deck.slice.ts'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

import s from './packs-list.module.scss'

export const PacksList = () => {
  const tabSwitcherOptions = [
    { id: 1, value: 'My Cards' },
    { id: 2, value: 'All Cards' },
  ]

  const [packName, setPackName] = useState('')

  const initialName = useAppSelector(state => state.deckSlice.searchByName)
  const dispatch = useAppDispatch()

  const [sortTable, setSortTable] = useState(false)
  // const [open, setOpen] = useState(false)
  const [open, setOpen] = useState({
    addNewPack: false,
    editPack: false,
  })
  const [cardId, setCardId] = useState('')

  const [privatePack, setPrivatePack] = useState(false)
  const [userId, setUserId] = useState('')
  const changeSort = (status: boolean) => setSortTable(status)

  const newInitialName = useDebounce(initialName, 1000)

  const { data } = useGetDecksQuery({
    name: newInitialName,
    orderBy: sortTable ? 'created-desc' : 'created-asc',
    itemsPerPage: 20,
    authorId: userId,
  })

  const { data: meData } = useMeQuery()

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()
  const setSearchByName = (event: string) => {
    dispatch(deckSlice.actions.setSearchByName(event))
  }
  const handleCreateClicked = () => {
    {
      open.addNewPack ? createDeck({ name: packName }) : editDeck({ id: cardId, name: packName })
    }
    setOpen({ ...open, addNewPack: false })
  }

  const handleDeleteCard = (id: string) => deleteDeck({ id })

  const handleTabSort = (value: string) => {
    if (value === 'My Cards') {
      setUserId(meData!.id)
    } else {
      setUserId('')
    }
  }

  const handleOpen = (value: string) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [value]: true,
    }))
  }
  const handleClose = (value: string) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [value]: false,
    }))
  }

  const setIsMyPackHandler = (value: boolean) => {
    dispatch(cardsSlice.actions.setIsMyPack({ isMyPack: value }))
  }

  return (
    <div className={s.packListBlock}>
      <div className={s.headBlock}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'} onClick={() => handleOpen('addNewPack')}>
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
          />
        </div>
        <div>
          <Typography variant={'body2'} className={s.titleSettings}>
            Number of cards
          </Typography>
          <SliderDemo minValue={0} maxValue={10} />
        </div>
        <Button variant={'secondary'}>
          <Trash />
          Clear Filter
        </Button>
      </div>
      <TableElement.Root>
        <TableElement.Head>
          <TableElement.Row>
            <TableElement.HeadCell>Name</TableElement.HeadCell>
            <TableElement.HeadCell>Cards</TableElement.HeadCell>
            <TableElement.HeadCell
              onClick={() => {
                changeSort(!sortTable)
              }}
            >
              Last Updated {sortTable ? <ArrowDown /> : <ArrowUp />}
            </TableElement.HeadCell>
            <TableElement.HeadCell>Created by</TableElement.HeadCell>
            <TableElement.HeadCell></TableElement.HeadCell>
          </TableElement.Row>
        </TableElement.Head>
        <TableElement.Body>
          {data?.items.map(el => {
            return (
              <TableElement.Row key={el.id}>
                <TableElement.Cell>
                  <Button
                    as={Link}
                    to={`/my-pack/${el.id}`}
                    variant={'link'}
                    onClick={() => setIsMyPackHandler(el.author.id === meData?.id)}
                  >
                    {el.name}
                  </Button>
                </TableElement.Cell>
                <TableElement.Cell>{el.cardsCount}</TableElement.Cell>
                <TableElement.Cell>
                  {new Date(el.created).toLocaleDateString('ru-RU')}
                </TableElement.Cell>
                <TableElement.Cell>{el.author.name}</TableElement.Cell>
                <TableElement.Cell>
                  <div className={s.icons}>
                    <Play />
                    {el.author.id === meData?.id && (
                      <>
                        <Edit
                          onClick={() => {
                            handleOpen('editPack')
                            setPackName(el.name)
                            setCardId(el.id)
                          }}
                        />
                        <Trash onClick={() => handleDeleteCard(el.id)} />
                      </>
                    )}
                  </div>
                </TableElement.Cell>
              </TableElement.Row>
            )
          })}
        </TableElement.Body>
      </TableElement.Root>
      <Modal
        title={open.addNewPack ? 'Add New Pack' : 'Edit Pack'}
        showCloseButton={true}
        open={open.addNewPack ? open.addNewPack : open.editPack}
        onClose={open.addNewPack ? () => handleClose('addNewPack') : () => handleClose('editPack')}
        titleButton={open.addNewPack ? 'Add New Pack' : 'Save Changes'}
        disableButton={!packName}
        callBack={handleCreateClicked}
      >
        <TextField
          type={'default'}
          value={packName}
          label={'Name Pack'}
          placeholder={'name'}
          onChangeText={e => setPackName(e)}
        />
        <CheckBox
          variant={'withText'}
          checkBoxText={'Private pack'}
          checked={privatePack}
          onChange={() => setPrivatePack(!privatePack)}
        />
      </Modal>
    </div>
  )
}
