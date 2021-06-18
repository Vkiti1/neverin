import { FC } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useReceipts } from 'context/receipts'
import { IconButton } from '@chakra-ui/react'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/layout'

export const Orders: FC = () => {
  const { orders, updateOrder, deleteOrder } = useReceipts()

  return (
    <Flex>
      <Grid w='50%' autoColumns='auto' autoRows='auto' gap={2}>
        {orders.map((order, i) => {
          return !order.isServed ? (
            <Grid maxHeight='400px' autoColumns='auto' autoRows='auto' gap={2}>
              <GridItem colSpan={3}>
                Time: {order.timestamp.toLocaleString()}
              </GridItem>
              <GridItem colSpan={3}>Table: {order.table}</GridItem>
              <GridItem colSpan={3}>Note: {order.note}</GridItem>
              <GridItem colSpan={3}>
                {order.order.map((item) => {
                  return (
                    <Grid templateColumns='repeat(3,1fr)'>
                      <GridItem colStart={1}>Item: {item.name}</GridItem>
                      <GridItem colStart={2}>
                        Quantity: {item.quantity}
                      </GridItem>
                      <GridItem colStart={3}>
                        Price: {item.price.toFixed(2)}
                      </GridItem>
                    </Grid>
                  )
                })}
              </GridItem>
              <GridItem colSpan={3} colStart={2}>
                Total: {order.total.toFixed(2)}
              </GridItem>
              <GridItem colStart={3}>
                <IconButton
                  aria-label='Is order paid?'
                  onClick={() => updateOrder(order.id)}
                  icon={<CheckIcon />}
                ></IconButton>
                <IconButton
                  ml={4}
                  onClick={() => deleteOrder(order.id)}
                  aria-label='Delete order'
                  icon={<DeleteIcon />}
                ></IconButton>
              </GridItem>
            </Grid>
          ) : null
        })}
      </Grid>
      <Grid w='50%' autoColumns='auto' autoRows='auto' gap={2}>
        {orders.map((order, i) => {
          return order.isServed ? (
            <Grid maxHeight='400px' autoColumns='auto' autoRows='auto' gap={2}>
              <GridItem colSpan={3}>
                Time: {order.timestamp.toLocaleString()}
              </GridItem>
              <GridItem colSpan={3}>Table: {order.table}</GridItem>
              <GridItem colSpan={3}>Note: {order.note}</GridItem>
              <GridItem colSpan={3}>
                {order.order.map((item) => {
                  return (
                    <Grid templateColumns='repeat(3,1fr)'>
                      <GridItem colStart={1}>Item: {item.name}</GridItem>
                      <GridItem colStart={2}>
                        Quantity: {item.quantity}
                      </GridItem>
                      <GridItem colStart={3}>
                        Price: {item.price.toFixed(2)}
                      </GridItem>
                    </Grid>
                  )
                })}
              </GridItem>
              <GridItem colSpan={3} colStart={2}>
                Total: {order.total.toFixed(2)}
              </GridItem>
              <GridItem colStart={3}>
                <IconButton
                  aria-label='Is order paid?'
                  onClick={() => updateOrder(order.id)}
                  icon={<CheckIcon />}
                ></IconButton>
                <IconButton
                  ml={4}
                  onClick={() => deleteOrder(order.id)}
                  aria-label='Delete order'
                  icon={<DeleteIcon />}
                ></IconButton>
              </GridItem>
            </Grid>
          ) : null
        })}
      </Grid>
    </Flex>
  )
}
