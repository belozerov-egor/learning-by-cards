import { useGetDecksQuery } from '../../../services/decks'
import { TableElement } from '../../ui'

export const Decks = () => {
  const { isLoading, data } = useGetDecksQuery({
    itemsPerPage: 20,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      isLoading: {isLoading.toString()}
      <TableElement.Root>
        <TableElement.Head>
          <TableElement.Cell>Name</TableElement.Cell>
          <TableElement.Cell>Cards</TableElement.Cell>
          <TableElement.Cell>Last Updated</TableElement.Cell>
          <TableElement.Cell>Create By</TableElement.Cell>
        </TableElement.Head>
        <TableElement.Body>
          {data?.items.map(el => {
            return (
              <TableElement.Row key={el.userId}>
                <TableElement.Cell>{el.name}</TableElement.Cell>
                <TableElement.Cell>{el.cardsCount}</TableElement.Cell>
                <TableElement.Cell>
                  {new Date(el.updated).toLocaleString('en-GB')}
                </TableElement.Cell>
                <TableElement.Cell>{el.author.name}</TableElement.Cell>
              </TableElement.Row>
            )
          })}
        </TableElement.Body>
      </TableElement.Root>
    </div>
  )
}
