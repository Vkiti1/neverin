import { FC } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { FReceipt } from 'types/index'
import { useReceipts } from 'context/receipts'

interface Props {
  order: FReceipt
}

export const Order: FC<Props> = ({ order }) => {
  const { serveOrder, deleteOrder, updateOrder } = useReceipts()

  return (
    <Grid
      maxHeight='400px'
      templateColumns='repeat(3,1fr)'
      autoRows='auto'
      gap={2}
      borderBottom='2px solid white'
      p={4}
      m={2}
    >
      <GridItem colSpan={3}>Table: {order.table}</GridItem>
      <GridItem colSpan={3}>Note: {order.note}</GridItem>
      <GridItem colStart={1}>Item</GridItem>
      <GridItem colStart={2}>Quantity</GridItem>
      <GridItem colStart={3}>Price</GridItem>
      <GridItem colSpan={3}>
        {order.order.map((item) => {
          return (
            <Grid ml={5} key={order.id} templateColumns='repeat(3,1fr)'>
              <GridItem colStart={1}>{item.name}</GridItem>
              <GridItem colStart={2}>{item.quantity}</GridItem>
              <GridItem colStart={3}>{item.price.toFixed(2)}</GridItem>
            </Grid>
          )
        })}
      </GridItem>
      <GridItem colStart={1}>Total: {order.total.toFixed(2)}</GridItem>
      <GridItem colStart={3}>
        {order.isServed ? (
          <IconButton
            aria-label='Is order paid?'
            onClick={() => updateOrder(order.id)}
            icon={<CheckIcon />}
          ></IconButton>
        ) : (
          <>
            <IconButton
              aria-label='Order served'
              onClick={() => serveOrder(order.id)}
              icon={<ArrowForwardIcon />}
            ></IconButton>
            <IconButton
              ml={4}
              onClick={() => deleteOrder(order.id)}
              aria-label='Delete order'
              icon={<DeleteIcon />}
            ></IconButton>
          </>
        )}
      </GridItem>
    </Grid>
  )
}
