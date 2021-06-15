import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { IconButton } from '@chakra-ui/button'
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

type Mode = 'read' | 'write'

interface Props {
  itemName: string
  itemPrice: number
  menu: Category[]
  menuUpdate: (changedMenu: Category[]) => void
  categoryName: string
  id: string
}

interface Category {
  name: string
  items: Items
}

interface Items {
  [key: string]: number
}

export const MenuItem: FC<Props> = ({
  id,
  categoryName,
  menu,
  itemName,
  itemPrice,
  menuUpdate,
}) => {
  const [mode, setMode] = useState<Mode>('read')
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(null)

  const startEdit: MouseEventHandler<HTMLButtonElement> = () => {
    setName(itemName)
    setPrice(itemPrice)
    setMode('write')
  }

  const onEditCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setName('')
    setPrice(null)
    setMode('read')
  }

  const nameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value)
  }

  const priceChange: (valueAsString: string, valueAsNumber: number) => void = (
    _,
    valueAsNumber
  ) => {
    setPrice(valueAsNumber)
  }

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    if (name === '' || name == null || name === 'undefined') {
      console.log('item name needs to be defined')
      return
    }
    if (price === 0 || price == null) {
      console.log('price needs to be a number')
      return
    }

    const categoryIndex = menu.findIndex(
      (category) => category.name === categoryName
    )

    delete menu[categoryIndex].items[itemName]

    menu[categoryIndex].items[name] = price

    menuUpdate(menu)

    setMode('read')
    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('menu')
        .doc(categoryName)
        .set(menu[categoryIndex].items)
    } catch (err) {
      console.error(err)
    } finally {
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
            onClick={startEdit}
            aria-label='Edit menu item'
            icon={<EditIcon />}
          />
        </>
      ) : (
        <>
          <Input placeholder={itemName} onChange={nameChange} />
          <NumberInput onChange={priceChange} min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <IconButton
            onClick={onSubmit}
            aria-label='Submit update'
            icon={<CheckIcon />}
          />
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
