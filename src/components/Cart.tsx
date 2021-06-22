import { Grid, GridItem } from '@chakra-ui/react'
import { FC } from 'react'
import { useReceipts } from 'context/receipts'

export const Cart: FC = () => {
  const { guestOrder } = useReceipts()
  return (
    <>
      <Grid templateColumns='repeat(3,1fr)' autoRows='auto'>
        <GridItem>Item</GridItem>
        <GridItem>Quantity</GridItem>
        <GridItem>Price</GridItem>
        {guestOrder.map((item) => {
          return (
            <>
              <GridItem>{item.name}</GridItem>
              <GridItem m='auto'>{item.quantity}</GridItem>
              <GridItem>{item.price}</GridItem>
            </>
          )
        })}
      </Grid>
      <GridItem>
        Total:{' '}
        {guestOrder.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity
        }, 0)}
      </GridItem>
    </>
  )
}
