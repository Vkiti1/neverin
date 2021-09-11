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
      width='90%'
      templateColumns='repeat(3,1fr)'
      autoRows='auto'
      borderBottom='2px solid'
      borderColor='text'
      my={5}
      gap={2}
      color='text'
      py={2}
    >
      <GridItem fontSize='xl' colSpan={3}>
        Table: {order.table}
      </GridItem>
      <GridItem colSpan={3} fontSize='xl'>
        Note: {order.note}
      </GridItem>
      <GridItem colStart={1} fontSize='xl'>
        Item
      </GridItem>
      <GridItem colStart={2} fontSize='xl'>
        Quantity
      </GridItem>
      <GridItem colStart={3} fontSize='xl'>
        Price
      </GridItem>
      <GridItem colSpan={3}>
        {order.order.map((item) => {
          return (
            <Grid key={item.name} templateColumns='repeat(3,1fr)' ml={2}>
              <GridItem fontSize='xl' colStart={1}>
                {item.name}
              </GridItem>
              <GridItem fontSize='xl' colStart={2}>
                {item.quantity}
              </GridItem>
              <GridItem colStart={3} fontSize='xl'>
                {item.price.toFixed(2)} kn
              </GridItem>
            </Grid>
          )
        })}
      </GridItem>
      <GridItem fontSize='xl' colStart={1}>
        Total: {order.total.toFixed(2)} kn
      </GridItem>
      <GridItem colStart={3} justifySelf='end' fontSize='xl'>
        {order.isServed ? (
          <IconButton
            aria-label='Is order paid?'
            onClick={() => updateOrder(order.id)}
            fontSize='3xl'
            border='2px solid rgba(79, 79, 79, 0)'
            _hover={{ border: '2px solid rgba(79, 79, 79, 1)' }}
            transition='0.15s all ease-in'
            bg='white'
            icon={<CheckIcon />}
          ></IconButton>
        ) : (
          <>
            <IconButton
              aria-label='Order served'
              fontSize='3xl'
              onClick={() => serveOrder(order.id)}
              icon={<ArrowForwardIcon />}
              border='2px solid rgba(79, 79, 79, 0)'
              _hover={{ border: '2px solid rgba(79, 79, 79, 1)' }}
              transition='0.15s all ease-in'
              bg='white'
            ></IconButton>
            <IconButton
              ml={4}
              onClick={() => deleteOrder(order.id)}
              fontSize='3xl'
              aria-label='Delete order'
              size='lg'
              icon={<DeleteIcon />}
              border='2px solid rgba(79, 79, 79, 0)'
              _hover={{ border: '2px solid rgba(79, 79, 79, 1)' }}
              transition='0.15s all ease-in'
              bg='white'
            ></IconButton>
          </>
        )}
      </GridItem>
    </Grid>
  )
}
