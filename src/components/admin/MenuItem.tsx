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
  Flex,
  Text,
} from '@chakra-ui/react'
import { Category } from 'types/index'

type Mode = 'read' | 'write'

interface Props {
  itemName: string
  itemPrice: number
  menu: Category[]
  menuUpdate: (changedMenu: Category[]) => void
  categoryName: string
  shopId: string
  categoryIndex: number
  itemCode: string
  imageUrl: string
}

export const MenuItem: FC<Props> = ({
  shopId,
  categoryName,
  menu,
  itemName,
  itemPrice,
  menuUpdate,
  categoryIndex,
  itemCode,
  imageUrl,
}) => {
  const [mode, setMode] = useState<Mode>('read')
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(null)
  const [code, setCode] = useState<string>('')

  const startEdit: MouseEventHandler<HTMLButtonElement> = () => {
    setName(itemName)
    setPrice(itemPrice)
    setCode(itemCode)
    setMode('write')
  }

  const onEditCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setName('')
    setPrice(null)
    setCode('')
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

  const codeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCode(e.target.value)
  }

  const deleteMenuItem: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const newMenu = menu.slice()

      delete newMenu[categoryIndex].items[itemName]

      menuUpdate(newMenu)
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
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
    if (code === '' || code == null || typeof code === 'undefined') {
      console.log('code needs to be defined')
      return
    }
    try {
      const newMenu = menu.slice()

      delete newMenu[categoryIndex].items[itemName]
      newMenu[categoryIndex].items[name] = {
        price: price,
        code: code,
        image: imageUrl,
      }

      menuUpdate(newMenu)
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('menu')
        .doc(categoryName)
        .set(newMenu[categoryIndex].items)
    } catch (err) {
      menuUpdate(menu)
      console.error(err)
    } finally {
      setName('')
      setPrice(null)
      setCode('')
      setMode('read')
    }
  }

  return (
    <>
      {mode === 'read' ? (
        <Box color='white' my={4}>
          <Flex marginBottom={2} justifyContent='space-evenly'>
            <Text>{itemName}</Text>
            <Text>{itemPrice} kn</Text>
            <Text>{itemCode}</Text>
          </Flex>
          <Box>
            <IconButton
              w='45%'
              marginLeft={2}
              marginRight={2}
              onClick={startEdit}
              aria-label='Edit menu item'
              icon={<EditIcon />}
              color='white'
              bg='accent'
              _hover={{ bg: 'white', color: 'accent' }}
            />
            <IconButton
              w='45%'
              marginLeft={1}
              onClick={deleteMenuItem}
              aria-label='Delete item'
              icon={<DeleteIcon />}
              color='white'
              bg='accent'
              _hover={{ bg: 'white', color: 'accent' }}
            />
          </Box>
          <Divider marginTop={2} />
        </Box>
      ) : (
        <>
          <Input
            defaultValue={itemName}
            marginBottom={2}
            placeholder={itemName}
            onChange={nameChange}
            color='white'
          />
          <NumberInput
            defaultValue={itemPrice}
            marginBottom={2}
            onChange={priceChange}
            min={1}
            color='white'
          >
            <NumberInputField placeholder={itemPrice.toString()} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Input
            defaultValue={itemCode}
            marginBottom={2}
            placeholder={itemCode}
            onChange={codeChange}
            color='white'
          />
          <Box>
            <IconButton
              w='45%'
              marginLeft={2}
              marginRight={2}
              onClick={onSubmit}
              aria-label='Submit update'
              icon={<CheckIcon />}
              color='white'
              bg='accent'
              _hover={{ bg: 'white', color: 'accent' }}
            />
            <IconButton
              w='45%'
              marginLeft={1}
              onClick={onEditCancel}
              aria-label='Cancel update'
              icon={<CloseIcon />}
              color='white'
              bg='accent'
              _hover={{ bg: 'white', color: 'accent' }}
            />
          </Box>
          <Divider marginTop={2} />
        </>
      )}
    </>
  )
}
