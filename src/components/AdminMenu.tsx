import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Flex, Text } from '@chakra-ui/layout'
import { MenuItem } from 'components/MenuItem'
import { NewItem } from 'components/NewItem'
import { Select } from '@chakra-ui/react'
import { Category, Items } from 'types/index'
interface Props {
  id: string
}

export const AdminMenu: FC<Props> = ({ id }) => {
  const [menu, setMenu] = useState<Category[]>([])
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryIndex, setCategoryIndex] = useState<number>(0)

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

  const menuUpdate = (changedMenu: Category[]) => {
    setMenu([...changedMenu])
  }

  return (
    <>
      <NewItem menuUpdate={menuUpdate} id={id} menu={menu} />
      <Select marginTop={8} marginBottom={2} placeholder='Select category'>
        {menu.map((category, i) => {
          return (
            <option
              key={category.name}
              onClick={() => {
                setCategoryName(category.name)
                setCategoryIndex(i)
              }}
              value={category.name}
            >
              {category.name}
            </option>
          )
        })}
      </Select>
      {categoryName !== ''
        ? Object.entries(menu[categoryIndex].items).map(
            ([itemName, itemPrice]) => {
              return (
                <Flex key={itemName} marginBottom={2} direction='column'>
                  <MenuItem
                    id={id}
                    categoryName={categoryName}
                    categoryIndex={categoryIndex}
                    itemName={itemName}
                    menu={menu}
                    menuUpdate={menuUpdate}
                    itemPrice={itemPrice}
                  />
                </Flex>
              )
            }
          )
        : null}
    </>
  )
}
