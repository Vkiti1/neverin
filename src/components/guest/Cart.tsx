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
      <Grid templateColumns='repeat(3,1fr)' autoRows='auto'>
        <GridItem>Item</GridItem>
        <GridItem>Quantity</GridItem>
        <GridItem>Price</GridItem>
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
                />
                <IconButton
                  onClick={() => decreaseQuantity(i)}
                  m={1}
                  size='sm'
                  aria-label='Quantity minus'
                  icon={<MinusIcon />}
                />
              </GridItem>
              <GridItem>{item.price.toFixed(2)}</GridItem>
            </>
          )
        })}
      </Grid>
      <GridItem>
        Note for the waiter:
        <Input onChange={addNote} type='text' value={note} />
      </GridItem>
      <GridItem>
        Total:{' '}
        {guestOrder
          .reduce((acc, curr) => {
            return acc + curr.price * curr.quantity
          }, 0)
          .toFixed(2)}
      </GridItem>
      <GridItem>
        <IconButton
          onClick={submitGuestOrder}
          m={2}
          aria-label='Submit order'
          icon={<CheckIcon />}
        />
        <IconButton
          onClick={cancelGuestOrder}
          m={2}
          aria-label='Cancel order'
          icon={<CloseIcon />}
        />
      </GridItem>
    </>
  )
}
