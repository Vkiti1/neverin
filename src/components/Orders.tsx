import { FC } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useReceipts } from 'context/receipts'
import { IconButton } from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/layout'
import { Order } from 'components/Order'

export const Orders: FC = () => {
  const { orders } = useReceipts()

  return (
    <Grid p={4} templateColumns='repeat(2,1fr)'>
      <Flex ml={4} direction='column'>
        {orders.map((order, i) => {
          console.log(order.id)
          return !order.isServed && <Order key={order.id} order={order} />
        })}
      </Flex>
      <Flex mr={4} direction='column'>
        {orders.map((order, i) => {
          console.log(order.id)
          return order.isServed && <Order key={order.id} order={order} />
        })}
      </Flex>
    </Grid>
  )
}
