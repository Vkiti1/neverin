import { Grid, GridItem, Input } from '@chakra-ui/react'
import { FC } from 'react'
import { useReceipts } from 'context/receipts'
import { IconButton } from '@chakra-ui/react'
import { AddIcon, MinusIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'

export const Cart: FC = () => {
  const {
    guestOrder,
    increaseQuantity,
    decreaseQuantity,
    submitGuestOrder,
    cancelGuestOrder,
    addNote,
    note,
  } = useReceipts()
  return (
    <>
      <Grid
        color='white'
        templateColumns='repeat(3,1fr)'
        autoRows='auto'
        alignItems='center'
        rowGap={2}
      >
        <GridItem fontSize='lg'>Item</GridItem>
        <GridItem fontSize='lg'>Quantity</GridItem>
        <GridItem fontSize='lg'>Price</GridItem>
        {guestOrder.map((item, i) => {
          return (
            <>
              <GridItem>{item.name}</GridItem>
              <GridItem>
                {item.quantity}
                <IconButton
                  onClick={() => increaseQuantity(i)}
                  m={1}
                  size='sm'
                  aria-label='Quantity plus'
                  icon={<AddIcon />}
                  color='white'
                  bg='accent'
                  _active={{ color: 'accent', bg: 'white' }}
                />
                <IconButton
                  onClick={() => decreaseQuantity(i)}
                  m={1}
                  size='sm'
                  aria-label='Quantity minus'
                  icon={<MinusIcon />}
                  color='white'
                  bg='accent'
                  _active={{ color: 'accent', bg: 'white' }}
                />
              </GridItem>
              <GridItem>{item.price.toFixed(2)} kn</GridItem>
            </>
          )
        })}

        <GridItem colSpan={3}>
          Note for the waiter:
          <Input colSpan={3} onChange={addNote} type='text' value={note} />
        </GridItem>
        <GridItem colSpan={3} fontSize='lg'>
          Total:{' '}
          {guestOrder
            .reduce((acc, curr) => {
              return acc + curr.price * curr.quantity
            }, 0)
            .toFixed(2)}
        </GridItem>
        <GridItem colSpan={3}>
          <IconButton
            w='45%'
            onClick={submitGuestOrder}
            m={2}
            aria-label='Submit order'
            icon={<CheckIcon />}
            color='white'
            bg='background'
            _active={{ color: 'accent', bg: 'white' }}
          />
          <IconButton
            w='45%'
            onClick={cancelGuestOrder}
            m={2}
            aria-label='Cancel order'
            icon={<CloseIcon />}
            color='white'
            bg='background'
            _active={{ color: 'accent', bg: 'white' }}
          />
        </GridItem>
      </Grid>
    </>
  )
}
