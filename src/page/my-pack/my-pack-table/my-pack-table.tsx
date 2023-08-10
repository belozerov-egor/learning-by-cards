import { FC } from 'react'

import { ArrowDown, ArrowUp, Edit, Trash } from '../../../common'
import { Grade, TableElement } from '../../../components'
import { CardsResponse } from '../../../services/cards/types.ts'

import s from './my-pack-table.module.scss'

type PropsType = {
  dataCards?: CardsResponse | undefined
  setSortTable: (value: boolean) => void
  sortTable: boolean
}
export const MyPackTable: FC<PropsType> = ({ dataCards, setSortTable, sortTable }) => {
  return (
    <TableElement.Root>
      <TableElement.Head>
        <TableElement.Row>
          <TableElement.HeadCell>Question</TableElement.HeadCell>
          <TableElement.HeadCell>Answer</TableElement.HeadCell>
          <TableElement.HeadCell onClick={() => setSortTable(!sortTable)}>
            Last Updated {sortTable ? <ArrowDown /> : <ArrowUp />}
          </TableElement.HeadCell>
          <TableElement.HeadCell>Grade</TableElement.HeadCell>
          <TableElement.HeadCell></TableElement.HeadCell>
        </TableElement.Row>
      </TableElement.Head>
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
                <Grade rating={el.rating} />
              </TableElement.Cell>
              <TableElement.Cell>
                <div className={s.icons}>
                  <Edit />
                  <Trash />
                </div>
              </TableElement.Cell>
            </TableElement.Row>
          )
        })}
      </TableElement.Body>
    </TableElement.Root>
  )
}
