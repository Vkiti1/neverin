import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { IconButton } from '@chakra-ui/button'
import { EditIcon, CloseIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
} from '@chakra-ui/react'
import { Category } from 'types/index'

type Mode = 'read' | 'write'

interface Props {
  itemName: string
  itemPrice: number
  menu: Category[]
  menuUpdate: (changedMenu: Category[]) => void
  categoryName: string
  id: string
  categoryIndex: number
}

export const MenuItem: FC<Props> = ({
  id,
  categoryName,
  menu,
  itemName,
  itemPrice,
  menuUpdate,
  categoryIndex,
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

  const deleteMenuItem: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const newMenu = menu

      delete newMenu[categoryIndex].items[itemName]

      menuUpdate(newMenu)
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('menu')
        .doc(categoryName)
        .set(newMenu[categoryIndex].items)
    } catch (err) {
      menuUpdate(menu)
      console.error(err)
    } finally {
      setMode('read')
    }
  }

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    if (name === '' || name == null || typeof name === 'undefined') {
      console.log('item name needs to be defined')
      return
    }
    if (price === 0 || price == null) {
      console.log('price needs to be a number')
      return
    }

    try {
      const newMenu = menu

      delete newMenu[categoryIndex].items[itemName]
      newMenu[categoryIndex].items[name] = price

      menuUpdate(newMenu)
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('menu')
        .doc(categoryName)
        .set(newMenu[categoryIndex].items)
    } catch (err) {
      menuUpdate(menu)
      console.error(err)
    } finally {
      setMode('read')
    }
  }

  return (
    <>
      {mode === 'read' ? (
        <Box marginBottom={3}>
          <Box marginBottom={2}>
            {itemName}: {itemPrice}
          </Box>
          <Box>
            <IconButton
              w='45%'
              marginLeft={2}
              marginRight={2}
              onClick={startEdit}
              aria-label='Edit menu item'
              icon={<EditIcon />}
            />
            <IconButton
              w='45%'
              marginLeft={1}
              onClick={deleteMenuItem}
              aria-label='Delete item'
              icon={<DeleteIcon />}
            />
          </Box>
          <Divider marginTop={2} />
        </Box>
      ) : (
        <>
          <Input
            marginBottom={2}
            placeholder={itemName}
            onChange={nameChange}
          />
          <NumberInput marginBottom={2} onChange={priceChange} min={1}>
            <NumberInputField placeholder={itemPrice.toString()} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Box>
            <IconButton
              w='45%'
              marginLeft={2}
              marginRight={2}
              onClick={onSubmit}
              aria-label='Submit update'
              icon={<CheckIcon />}
            />
            <IconButton
              w='45%'
              marginLeft={1}
              onClick={onEditCancel}
              aria-label='Cancel update'
              icon={<CloseIcon />}
            />
          </Box>
          <Divider marginTop={2} />
        </>
      )}
    </>
  )
}
