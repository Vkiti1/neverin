import { IconButton, Input, Select } from '@chakra-ui/react'
import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/react'
import { CloseIcon, CheckIcon, AddIcon } from '@chakra-ui/icons'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Box, Flex } from '@chakra-ui/layout'
import { Category } from 'types/index'

type Mode = 'read' | 'write'

interface Props {
  menu: Category[]
  menuUpdate: (changedMenu: Category[]) => void
  id: string
}

export const NewItem: FC<Props> = ({ menu, menuUpdate, id }) => {
  const [mode, setMode] = useState<Mode>('read')
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(null)
  const [categoryIndex, setCategoryIndex] = useState<number>(0)

  const onItemCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setName('')
    setPrice(null)
    setMode('read')
  }

  const onItemSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    if (name === '' || name == null || typeof name === 'undefined') {
      console.log('item name needs to be defined')
      return
    }
    if (price === 0 || price == null) {
      console.log('price needs to be a number')
      return
    }

    const newMenu = menu

    try {
      newMenu[categoryIndex].items[name] = price
      menuUpdate(newMenu)
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(id)
        .collection('menu')
        .doc(menu[categoryIndex].name)
        .set(newMenu[categoryIndex].items)
    } catch (err) {
      menuUpdate(menu)
      console.error(err)
    } finally {
      setMode('read')
    }
  }

  const priceChange: (valueAsString: string, valueAsNumber: number) => void = (
    _,
    valueAsNumber
  ) => {
    setPrice(valueAsNumber)
  }

  const nameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value)
  }

  return (
    <div>
      {mode === 'write' ? (
        <>
          <Select
            marginTop={2}
            marginBottom={2}
            isRequired
            placeholder='Type of drink'
          >
            {menu.map((category, i) => {
              return (
                <option
                  onClick={() => setCategoryIndex(i)}
                  value={category.name}
                >
                  {category.name}
                </option>
              )
            })}
          </Select>
          <Input
            marginBottom={2}
            onChange={nameChange}
            placeholder='Item name'
          ></Input>
          <NumberInput
            marginBottom={2}
            onChange={priceChange}
            placeholder='Item price'
            min={1}
          >
            <NumberInputField />
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
              onClick={onItemSubmit}
              aria-label='Submit'
              icon={<CheckIcon />}
            />
            <IconButton
              w='45%'
              marginLeft={1}
              onClick={onItemCancel}
              aria-label='Cancel'
              icon={<CloseIcon />}
            />
          </Box>
        </>
      ) : (
        <Flex justifyContent='space-between'>
          <Text fontSize='1.2rem' alignSelf='center'>
            Add item
          </Text>
          <IconButton
            onClick={() => setMode('write')}
            aria-label='Add new item'
            icon={<AddIcon />}
          />
        </Flex>
      )}
    </div>
  )
}
