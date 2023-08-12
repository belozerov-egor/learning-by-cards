import { FC } from 'react'

import { ArrowDown, ArrowUp } from '../../../common'
import { Column } from '../../../page/pack-list/pack-table'
import { Sort, TableElement } from '../index.ts'

type PropsType = {
  columns: Column[]
  sort?: Sort
  onSort?: (sort: Sort) => void
}
export const HeaderTable: FC<PropsType> = ({ columns, sort, onSort }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <TableElement.Head>
      <TableElement.Row>
        {columns.map(({ title, sortable, key }) => {
          return (
            <TableElement.HeadCell key={key} onClick={handleSort(key, sortable)}>
              {title}
              {sort && sort.key === key && (
                <span>{sort.direction === 'asc' ? <ArrowDown /> : <ArrowUp />}</span>
              )}
            </TableElement.HeadCell>
          )
        })}
      </TableElement.Row>
    </TableElement.Head>
  )
}
