import { FC } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useReceipts } from 'context/receipts'
import { IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export const Orders: FC = () => {
  const { orders, orderUpdate } = useReceipts()

  return (
    <Grid templateColumns='repeat(3, 1fr)' autoRows='auto' gap={2}>
      {orders.map((order) => {
        return (
          <>
            <GridItem colSpan={3}>
              Time: {order.timestamp.toLocaleString()}
            </GridItem>
            <GridItem colSpan={3}>Table: {order.table}</GridItem>
            <GridItem colSpan={3}>Note: {order.note}</GridItem>
            <GridItem colSpan={3}>
              Paid: {order.isPaid ? 'paid' : 'not paid'}
            </GridItem>
            <GridItem colSpan={3}>
              {order.order.map((item) => {
                return (
                  <Grid templateColumns='repeat(3,1fr)'>
                    <GridItem>Item: {item.name}</GridItem>
                    <GridItem>Price: {item.price}</GridItem>
                    <GridItem>Quantity: {item.quantity}</GridItem>
                  </Grid>
                )
              })}
            </GridItem>
            <GridItem colSpan={3} colStart={2}>
              Total: {order.total}
            </GridItem>
            <GridItem colStart={3}>
              <IconButton
                aria-label='Is order paid?'
                onClick={() => orderUpdate(order.id)}
                icon={<CheckIcon />}
              ></IconButton>
            </GridItem>
          </>
        )
      })}
    </Grid>
  )
}
