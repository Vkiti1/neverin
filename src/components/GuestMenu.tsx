import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Category, Items } from 'types/index'
import { Box, Heading, Flex, Grid, GridItem } from '@chakra-ui/react'
import { GuestMenuItem } from 'components/GuestMenuItem'

interface Props {
  shopId: string
}

export const GuestMenu: FC<Props> = ({ shopId }) => {
  const [menu, setMenu] = useState<Category[]>([])

  useEffect(() => {
    const unsubscribe = firebaseInstance
      .firestore()
      .collection('shops')
      .doc(shopId)
      .collection('menu')
      .onSnapshot((querySnapshot) => {
        const menuArray: Category[] = querySnapshot.docs.map((category) => {
          return {
            name: category.id,
            items: category.data() as Items,
          }
        })
        setMenu(menuArray)
      })

    return () => unsubscribe()
  }, [])

  const formatCategoryName = (name: string) => {
    let splitString = name.split(/(?=[A-Z])/g)

    return splitString
      .map((word, i) =>
        i === 0
          ? `${word[0].toUpperCase()}${word.slice(1)}`
          : word.toLowerCase()
      )
      .join(' ')
  }

  return (
    <>
      {menu.map((category) => {
        return (
          <Box key={category.name}>
            <Heading textAlign='center'>
              {formatCategoryName(category.name)}
            </Heading>
            <Grid templateColumns='repeat(2, 1fr)' autoRows='auto'>
              {Object.entries(category.items).map(
                ([itemName, itemProperties]) => {
                  return (
                    <GridItem m='auto'>
                      <GuestMenuItem
                        key={itemName}
                        itemName={itemName}
                        itemPrice={itemProperties.price}
                        imageUrl={itemProperties.image}
                      />
                    </GridItem>
                  )
                }
              )}
            </Grid>
          </Box>
        )
      })}
    </>
  )
}
