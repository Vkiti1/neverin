import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Box, Flex } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/button'
import { EditIcon } from '@chakra-ui/icons'
import { MenuItem } from 'components/MenuItem'

interface Props {
  id: string
}

interface Category {
  name: string
  items: Items
}

interface Items {
  [key: string]: number
}

export const AdminMenu: FC<Props> = ({ id }) => {
  const [menu, setMenu] = useState<Category[]>([])

  const menuUpdate = (changedMenu: Category[]) => {
    setMenu([...changedMenu])
  }

  useEffect(() => {
    const fetchMenu = async () => {
      const menuQueryResult = await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('menu')
        .get()
      const menuArray: Category[] = menuQueryResult.docs.map((category) => {
        return {
          name: category.id,
          items: category.data() as Items,
        }
      })

      setMenu(menuArray)
    }

    fetchMenu()
  }, [])

  return (
    <>
      {menu.map((category) => {
        return (
          <Flex key={category.name} direction='column'>
            {category.name}
            {Object.entries(category.items).map(([itemName, itemPrice]) => {
              return (
                <>
                  <MenuItem
                    key={itemName}
                    id={id}
                    categoryName={category.name}
                    itemName={itemName}
                    menu={menu}
                    menuUpdate={menuUpdate}
                    itemPrice={itemPrice}
                  />
                </>
              )
            })}
          </Flex>
        )
      })}
    </>
  )
}
