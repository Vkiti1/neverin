import { IconButton, Input, Select, storageKey } from '@chakra-ui/react'
import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Button,
} from '@chakra-ui/react'
import { CloseIcon, CheckIcon, AddIcon } from '@chakra-ui/icons'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Box, Flex } from '@chakra-ui/layout'
import { Category } from 'types/index'

type Mode = 'read' | 'write'

interface Props {
  menu: Category[]
  menuUpdate: (changedMenu: Category[]) => void
  shopId: string
}

export const NewItem: FC<Props> = ({ menu, menuUpdate, shopId }) => {
  const [mode, setMode] = useState<Mode>('read')
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(null)
  const [code, setCode] = useState<string>('')
  const [image, setImage] = useState<File>(null)
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryIndex, setCategoryIndex] = useState<number>(0)

  const onItemCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setName('')
    setPrice(null)
    setCode('')
    setImage(null)
    setMode('read')
  }

  const onItemSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    if (
      categoryName === '' ||
      categoryName == null ||
      typeof categoryName === 'undefined'
    ) {
      console.log('you need to select a category')
      return
    }
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

    const storage = image
      ? firebaseInstance
          .storage()
          .ref()
          .child(`${shopId}/images/${categoryName}/${image.name}`)
      : null

    const newMenu = menu.slice()

    newMenu[categoryIndex].items[name] = {
      price: price,
      image: image ? `${shopId}/images/${categoryName}/${image.name}` : '',
      code: code,
    }

    try {
      menuUpdate(newMenu)
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('menu')
        .doc(menu[categoryIndex].name)
        .set(newMenu[categoryIndex].items)
      if (storage) {
        await storage.put(image)
      }
    } catch (err) {
      menuUpdate(menu)
      console.error(err)
    } finally {
      setName('')
      setPrice(null)
      setCode('')
      setImage(null)
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

  const codeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCode(e.target.value)
  }

  const imageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImage(e.target.files[0])
  }

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
                  key={category.name}
                  onClick={() => {
                    setCategoryIndex(i)
                    setCategoryName(category.name)
                  }}
                  value={formatCategoryName(category.name)}
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
          <Input
            marginBottom={2}
            onChange={codeChange}
            placeholder='Item code'
          ></Input>
          <>
            <Button
              mt={2}
              mb={2}
              variant='ghost'
              onClick={() => document.getElementById('file').click()}
            >
              <Input
                id='file'
                type='file'
                marginBottom={2}
                placeholder='Image'
                display='none'
                onChange={imageChange}
              />
              Select Image
            </Button>
          </>
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
