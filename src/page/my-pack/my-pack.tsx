import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Back, Edit, Play, SubMenu, Trash } from '../../common'
import { Button, DropDownMenuDemo, TextField, Typography } from '../../components'
import { useAppSelector } from '../../services'
import { useGetCardsQuery } from '../../services/cards'
import { useCreateCardMutation, useGetDeckQuery } from '../../services/decks'
import { ModalType } from '../pack-list'

import { CardsModal } from './cards-modal'
import { MyPackTable } from './my-pack-table/my-pack-table.tsx'
import s from './my-pack.module.scss'

export const MyPack = () => {
  const params = useParams<{ id: string }>()
  const [open, setOpen] = useState<ModalType>({
    addNewPack: false,
    editPack: false,
    deletePack: false,
  })
  const [cardId, setCardId] = useState<string>('')
  const [privatePack, setPrivatePack] = useState(false)
  const [packName, setPackName] = useState<string>('')
  const [cardSettings, setCardSettings] = useState({
    question: '',
    answer: '',
  })
  const isMyPack = useAppSelector(state => state.cardsSlice.isMyPack)
  const [createCard] = useCreateCardMutation()
  const { data } = useGetDeckQuery({
    id: params.id,
  })

  const { data: dataCards } = useGetCardsQuery({
    id: params.id,
  })

  const [sortTable, setSortTable] = useState(false)
  const changeSort = (status: boolean) => setSortTable(status)
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

  const modalCallback = () => {
    createCard({ id: data?.id, question: cardSettings.question, answer: cardSettings.answer })
  }

  const dropDownMenu = [
    {
      id: 1,
      component: (
        <Button variant={'link'} className={s.buttonDrop}>
          <Play />
          <Typography variant={'caption'}>Learn</Typography>
        </Button>
      ),
    },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={() => handleOpen('editPack')}>
          <Edit />
          <Typography variant={'caption'}>Edit</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={() => handleOpen('deletePack')}>
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
            {isMyPack && <DropDownMenuDemo items={dropDownMenu} trigger={<SubMenu />} />}
          </div>
          <Button variant={'primary'}>Add New Card</Button>
        </div>
        <TextField
          value={cardSettings.question}
          // onChangeText={event => setSearchByName(event)}
          type={'searchType'}
          className={s.textField}
        />
        <MyPackTable dataCards={dataCards} sortTable={sortTable} setSortTable={setSortTable} />
        <CardsModal
          open={open}
          cardSettings={cardSettings}
          handleClose={() => {}}
          privatePack={privatePack}
          setPrivatePack={setPrivatePack}
          setPackName={setPackName}
          handleCreateClicked={modalCallback}
        />
      </div>
      )
    </>
  )
}
