import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { useLocale } from 'context/locale'
import { Box } from '@chakra-ui/layout'

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

  return (
    <>
      {menu.map((category) => {
        return (
          <Box>
            {category.name}
            {Object.entries(category.translations[locale]).map(
              ([itemName, itemPrice]) => {
                return (
                  <Box>
                    {itemName}: {itemPrice}
                  </Box>
                )
              }
            )}
          </Box>
        )
      })}
    </>
  )
}
