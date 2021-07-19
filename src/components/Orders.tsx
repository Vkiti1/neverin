import { FC } from 'react'
import { Grid, Heading, Divider, GridItem } from '@chakra-ui/react'
import { useReceipts } from 'context/receipts'
import { Flex } from '@chakra-ui/layout'
import { Order } from 'components/Order'

export const Orders: FC = () => {
  const { orders } = useReceipts()

  return (
    <Grid p={4} templateColumns='1fr 2px 1fr'>
      <Flex ml={4} direction='column'>
        <Heading ml={4} fontSize='1.7rem' fontWeight='600'>
          New orders
        </Heading>
        {orders
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
          .map((order, i) => {
            return !order.isServed && <Order key={order.id} order={order} />
          })}
      </Flex>
      <GridItem colStart={2} w={0}>
        <Divider orientation='vertical' width='100%' />
      </GridItem>
      <Flex mr={4} direction='column'>
        <Heading ml={4} fontSize='1.7rem' fontWeight='600'>
          Served orders
        </Heading>
        {orders
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
          .map((order, i) => {
            return order.isServed && <Order key={order.id} order={order} />
          })}
      </Flex>
    </Grid>
  )
}
