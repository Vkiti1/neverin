import { FC, MouseEventHandler, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { useLocale } from 'context/locale'
import { Box, Flex } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/button'
import { EditIcon } from '@chakra-ui/icons'
import { MenuItem } from 'components/MenuItem'
interface Props {
  id: string
}

interface Category {
  name: string
  translations: Translations
}

interface Translations {
  [key: string]: number
}

export const AdminMenu: FC<Props> = ({ id }) => {
  const { locale } = useLocale()

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
          translations: category.data() as Translations,
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
            {Object.entries(category.translations[locale]).map(
              ([itemName, itemPrice]) => {
                return (
                  <>
                    <MenuItem
                      setMenu={setMenu}
                      menu={menu}
                      itemName={itemName}
                      itemPrice={itemPrice}
                    />
                  </>
                )
              }
            )}
          </Flex>
        )
      })}
    </>
  )
}
