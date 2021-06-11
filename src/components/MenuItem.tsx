import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react'
import { Box } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { IconButton } from '@chakra-ui/button'
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { useLocale } from 'context/locale'
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
  setMenu: Dispatch<SetStateAction<Category[]>>
}

interface Category {
  name: string
  items: Items
}

interface Items {
  [key: string]: number
}

export const MenuItem: FC<Props> = ({ menu, setMenu, itemName, itemPrice }) => {
  const [mode, setMode] = useState<Mode>('read')
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(null)

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
    console.log(valueAsNumber)
    setPrice(valueAsNumber)
  }

  const onSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    menu.map((category) => {
      console.log(Object.entries(category.items))
    })
  }

  return (
    <>
      {mode === 'read' ? (
        <>
          <Box>
            {itemName}: {itemPrice}
          </Box>
          <IconButton
            onClick={() => setMode('write')}
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
