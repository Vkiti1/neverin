import { FC, MouseEventHandler, useEffect, useState } from 'react'
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

  const editMenuItem = async () => {}

  return (
    <>
      <IconButton
        onClick={editMenuItem}
        aria-label='Edit menu'
        icon={<EditIcon />}
      />
      {menu.map((category) => {
        return (
          <Flex direction='column'>
            {category.name}
            {Object.entries(category.items).map(([itemName, itemPrice]) => {
              return (
                <>
                  <MenuItem
                    itemName={itemName}
                    menu={menu}
                    setMenu={setMenu}
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
