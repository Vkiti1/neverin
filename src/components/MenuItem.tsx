import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { IconButton } from '@chakra-ui/button'
import { EditIcon, CloseIcon } from '@chakra-ui/icons'

type Mode = 'read' | 'write'

interface Props {
  itemName: string
  itemPrice: number
  menu: Category[]
  setMenu: Dispatch<SetStateAction<Category[]>>
}

interface Category {
  name: string
  translations: Translations
}

interface Translations {
  [key: string]: number
}

export const MenuItem: FC<Props> = ({ menu, setMenu, itemName, itemPrice }) => {
  const [mode, setMode] = useState<Mode>('read')
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(null)

  const editMenuItem = async (itemName) => {
    setMode('write')
  }

  const onEditCancel = () => {
    setMode('read')
  }

  const nameChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
  }

  const priceChange = (e) => {
    e.preventDefault()
    const isNumber = e.target.value >= '0' && e.target.value <= '9'
    console.log(isNumber)
    if (isNumber) {
      setPrice(e.target.value)
    } else {
      alert('Price needs to be a number')
    }
  }

  return (
    <>
      {mode === 'read' ? (
        <>
          <Box>
            {itemName}: {itemPrice}
          </Box>
          <IconButton
            onClick={() => {
              editMenuItem(itemName)
            }}
            aria-label='Edit menu item'
            icon={<EditIcon />}
          />
        </>
      ) : (
        <>
          <Input placeholder={itemName} onChange={nameChange} />
          <Input placeholder={itemPrice.toString()} onChange={priceChange} />
          <IconButton
            onClick={onEditCancel}
            aria-label='Cancel update'
            icon={<CloseIcon />}
          />
        </>
      )}
    </>
  )
}
