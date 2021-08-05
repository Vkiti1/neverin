import { FC } from 'react'
import { Heading } from '@chakra-ui/react'
import { useReceipts } from 'context/receipts'
import { Flex } from '@chakra-ui/layout'
import { Order } from 'components/admin/Order'

export const Orders: FC = () => {
  const { orders } = useReceipts()

  return (
    <Flex w='100%'>
      <Flex
        borderRight='1px solid'
        borderColor='text'
        w='100%'
        direction='column'
        alignItems='center'
      >
        <Heading
          mt={10}
          borderBottom='2px solid'
          borderColor='text'
          fontSize='4xl'
          fontWeight='600'
          color='text'
        >
          New orders
        </Heading>
        {orders
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
          .map((order, i) => {
            return !order.isServed && <Order key={order.id} order={order} />
          })}
      </Flex>
      <Flex w='100%' direction='column' alignItems='center'>
        <Heading
          mt={10}
          borderBottom='2px solid '
          borderColor='text'
          alignSelf='center'
          fontSize='4xl'
          fontWeight='600'
          color='text'
        >
          Served orders
        </Heading>
        {orders
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
          .map((order, i) => {
            return order.isServed && <Order key={order.id} order={order} />
          })}
      </Flex>
    </Flex>
  )
}
