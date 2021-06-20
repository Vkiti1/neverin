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
    >
      <GridItem colSpan={3}>Time: {order.timestamp.toLocaleString()}</GridItem>
      <GridItem colSpan={3}>Table: {order.table}</GridItem>
      <GridItem colSpan={3}>Note: {order.note}</GridItem>
      <GridItem colSpan={3}>
        {order.order.map((item) => {
          return (
            <Grid templateColumns='repeat(3,1fr)'>
              <GridItem colStart={1}>Item: {item.name}</GridItem>
              <GridItem colStart={2}>Quantity: {item.quantity}</GridItem>
              <GridItem colStart={3}>Price: {item.price.toFixed(2)}</GridItem>
            </Grid>
          )
        })}
      </GridItem>
      <GridItem colSpan={2} colStart={2}>
        Total: {order.total.toFixed(2)}
      </GridItem>
      <GridItem colStart={3}>
        {order.isServed ? (
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
        ) : (
          <IconButton
            aria-label='Is order paid?'
            onClick={() => updateOrder(order.id)}
            icon={<CheckIcon />}
          ></IconButton>
        )}
      </GridItem>
      {order.isServed ? 'da' : 'ne'}
    </Grid>
  )
}
