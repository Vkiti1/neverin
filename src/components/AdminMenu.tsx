import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Flex } from '@chakra-ui/layout'
import { MenuItem } from 'components/MenuItem'
import { NewItem } from 'components/NewItem'
import { Select } from '@chakra-ui/react'
import { Category, Items } from 'types/index'
interface Props {
  shopId: string
}

export const AdminMenu: FC<Props> = ({ shopId }) => {
  const [menu, setMenu] = useState<Category[]>([])
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryIndex, setCategoryIndex] = useState<number>(0)

  useEffect(() => {
    const fetchMenu = async () => {
      const menuQueryResult = await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
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

  const menuUpdate = (changedMenu: Category[]) => {
    setMenu([...changedMenu])
  }

  return (
    <>
      <NewItem menu={menu} menuUpdate={menuUpdate} shopId={shopId} />
      <Select mt={8} mb={2} placeholder='Select category'>
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
              {formatCategoryName(category.name)}
            </option>
          )
        })}
      </Select>
      {categoryName !== '' &&
        Object.entries(menu[categoryIndex].items).map(
          ([itemName, itemProperties]) => {
            return (
              <Flex key={itemName} marginBottom={2} direction='column'>
                <MenuItem
                  shopId={shopId}
                  categoryName={categoryName}
                  categoryIndex={categoryIndex}
                  itemName={itemName}
                  menu={menu}
                  menuUpdate={menuUpdate}
                  itemPrice={itemProperties.price}
                  itemCode={itemProperties.code}
                  imageUrl={itemProperties.image}
                />
              </Flex>
            )
          }
        )}
    </>
  )
}
