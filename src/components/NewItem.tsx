import { IconButton, Input, Select } from '@chakra-ui/react'
import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { CloseIcon, CheckIcon, AddIcon } from '@chakra-ui/icons'
import { firebaseInstance } from 'util/firebase-server-side-instance'

type Mode = 'read' | 'write'

interface Props {
  menu: Category[]
  menuUpdate: (changedMenu: Category[]) => void
  id: string
}

interface Category {
  name: string
  items: Items
}

interface Items {
  [key: string]: number
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
          <Select isRequired placeholder='Type of drink'>
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
          <Input onChange={nameChange} placeholder='Item name'></Input>
          <NumberInput onChange={priceChange} placeholder='Item price' min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <IconButton
            onClick={onItemSubmit}
            aria-label='Submit'
            icon={<CheckIcon />}
          />
          <IconButton
            onClick={onItemCancel}
            aria-label='Cancel'
            icon={<CloseIcon />}
          />
        </>
      ) : (
        <IconButton
          onClick={() => setMode('write')}
          aria-label='Add new item'
          icon={<AddIcon />}
        />
      )}
    </div>
  )
}
