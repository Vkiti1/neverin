import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Category, Items } from 'types/index'
import { Box, Heading, SimpleGrid, GridItem } from '@chakra-ui/react'
import { GuestMenuItem } from 'components/guest/GuestMenuItem'
import { formatCategoryName } from 'util/helpers'

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

  return (
    <>
      {menu.map((category) => {
        return (
          <Box key={category.name} width='90%' mx='auto' py={4}>
            <Heading color='text' fontSize='4xl' my='25px' textAlign='center'>
              {formatCategoryName(category.name)}
            </Heading>
            <SimpleGrid columns={2} spacingY='20px' placeItems='center'>
              {Object.entries(category.items).map(
                ([itemName, itemProperties]) => {
                  return (
                    <Box key={itemName}>
                      <GuestMenuItem
                        itemName={itemName}
                        itemPrice={itemProperties.price}
                        imageUrl={itemProperties.image}
                      />
                    </Box>
                  )
                }
              )}
            </SimpleGrid>
          </Box>
        )
      })}
    </>
  )
}
