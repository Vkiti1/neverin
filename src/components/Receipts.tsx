import { FC } from 'react'
import { useReceipts } from 'context/receipts'
import { Grid, GridItem } from '@chakra-ui/react'

export const Receipts: FC = () => {
  const { receipts } = useReceipts()

  return (
    <Grid templateColumns='repeat(1, 1fr)' autoRows='auto' gap={2}>
      {receipts
        .sort((a, b) => b.timestamp.getDate() - a.timestamp.getDate())
        .map((receipt) => {
          return (
            <Grid
              templateColumns='repeat(3,1fr)'
              autoRows='auto'
              key={receipt.id}
              borderBottom='2px solid white'
              p={2}
              mb={4}
            >
              <GridItem colSpan={3}>
                Time: {receipt.timestamp.toLocaleString()}
              </GridItem>
              <GridItem colSpan={3}>Table: {receipt.table}</GridItem>
              <GridItem colSpan={3}>Note: {receipt.note}</GridItem>
              <GridItem colSpan={3}>
                {receipt.order.map((item) => {
                  return (
                    <Grid templateColumns='repeat(3,1fr)'>
                      <GridItem>Item: {item.name}</GridItem>
                      <GridItem>Quantity: {item.quantity}</GridItem>
                      <GridItem>Price: {item.price.toFixed(2)}</GridItem>
                    </Grid>
                  )
                })}
              </GridItem>
              <GridItem colSpan={3} colStart={2}>
                Total: {receipt.total.toFixed(2)}
              </GridItem>
            </Grid>
          )
        })}
    </Grid>
  )
}
