import { FC } from 'react'

import { Edit, Trash } from '../../../common'
import { Grade, Sort, TableElement } from '../../../components'
import { HeaderTable } from '../../../components/ui/table/header-table.tsx'
import { modalActions, useAppDispatch } from '../../../services'
import { CardsResponse } from '../../../services/cards/types.ts'

import s from './my-pack-table.module.scss'

type PropsType = {
  dataCards: CardsResponse | undefined
  setCardId: (cardId: string) => void
  sort: Sort
  setSort: (value: Sort) => void
}
export type Column = {
  key: string
  title: string
  sortable?: boolean
}

const columns: Array<Column> = [
  {
    key: 'question',
    title: 'Question',
    sortable: true,
  },
  {
    key: 'answer',
    title: 'Answer',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'grade',
    title: 'Grade',
    sortable: true,
  },
  {
    key: 'activity',
    title: '',
  },
]

export const MyPackTable: FC<PropsType> = ({ dataCards, setCardId, sort, setSort }) => {
  const dispatch = useAppDispatch()
  const onEditHandler = (
    question: string,
    answer: string,
    cardId: string,
    questionImg: string | undefined,
    answerImg: string | undefined
  ) => {
    dispatch(modalActions.setOpenModal('editCard'))
    dispatch(modalActions.setQuestion(question))
    dispatch(modalActions.setAnswer(answer))
    dispatch(modalActions.setQuestionEditImg(questionImg))
    dispatch(modalActions.setAnswerEditImg(answerImg))
    setCardId(cardId)
  }

  const onDeleteHandler = (question: string, cardId: string) => {
    dispatch(modalActions.setOpenModal('deleteCard'))
    dispatch(modalActions.setQuestion(question))
    setCardId(cardId)
  }

  return (
    <TableElement.Root>
      <HeaderTable columns={columns} sort={sort} onSort={setSort} />
      <TableElement.Body>
        {dataCards?.items.map(el => {
          return (
            <TableElement.Row key={el.id}>
              <TableElement.Cell>{el.question}</TableElement.Cell>
              <TableElement.Cell>{el.answer}</TableElement.Cell>
              <TableElement.Cell>
                {new Date(el.updated).toLocaleDateString('ru-RU')}
              </TableElement.Cell>
              <TableElement.Cell>
                <Grade rating={el.grade} />
              </TableElement.Cell>
              <TableElement.Cell>
                <div className={s.icons}>
                  <Edit
                    onClick={() =>
                      onEditHandler(el.question, el.answer, el.id, el.questionImg, el.answerImg)
                    }
                  />
                  <Trash onClick={() => onDeleteHandler(el.question, el.id)} />
                </div>
              </TableElement.Cell>
            </TableElement.Row>
          )
        })}
      </TableElement.Body>
    </TableElement.Root>
  )
}
