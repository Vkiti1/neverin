import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Category, Items } from 'types/index'
import { Box, Text } from '@chakra-ui/react'

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
          <Box>
            <Text>{category.name}</Text>
            <Box>
              {Object.entries(category.items).map(([itemName, itemPrice]) => {
                return (
                  <Text>
                    {itemName}: {itemPrice}
                  </Text>
                )
              })}
            </Box>
          </Box>
        )
      })}
    </>
  )
}
