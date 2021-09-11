import { FC } from 'react'
import { useReceipts } from 'context/receipts'
import { Flex, Grid, GridItem } from '@chakra-ui/react'

export const Receipts: FC = () => {
  const { receipts } = useReceipts()

  return (
    <Flex color='white' direction='column' fontSize='lg'>
      {receipts
        .sort((a, b) => b.timestamp.getDate() - a.timestamp.getDate())
        .map((receipt) => {
          return (
            <Grid
              templateColumns='repeat(3,1fr)'
              autoRows='auto'
              key={receipt.id}
              borderBottom='2px solid white'
              p={2}
              mb={4}
            >
              <GridItem colSpan={3}>
                Time: {receipt.timestamp.toLocaleString()}
              </GridItem>
              <GridItem colSpan={3}>Table: {receipt.table}</GridItem>
              <GridItem colSpan={3}>Note: {receipt.note}</GridItem>
              <GridItem colStart={1}>Item</GridItem>
              <GridItem colStart={2}>Quantity</GridItem>
              <GridItem colStart={3}>Price</GridItem>
              <GridItem colSpan={3}>
                {receipt.order.map((item) => {
                  return (
                    <Grid
                      ml={4}
                      templateColumns='repeat(3,1fr)'
                      key={item.name}
                    >
                      <GridItem>{item.name}</GridItem>
                      <GridItem>{item.quantity}</GridItem>
                      <GridItem>{item.price.toFixed(2)} kn</GridItem>
                    </Grid>
                  )
                })}
              </GridItem>
              <GridItem colSpan={3} colStart={1}>
                Total: {receipt.total.toFixed(2)} kn
              </GridItem>
            </Grid>
          )
        })}
    </Flex>
  )
}
