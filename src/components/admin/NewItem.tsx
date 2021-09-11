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
import { formatCategoryName } from 'util/helpers'

interface Props {
  menu: Category[]
  menuUpdate: (changedMenu: Category[]) => void
  shopId: string
}

export const NewItem: FC<Props> = ({ menu, menuUpdate, shopId }) => {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [code, setCode] = useState<string>('')
  const [image, setImage] = useState<File>(null)
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryIndex, setCategoryIndex] = useState<number>(0)

  const onItemCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setName('')
    setPrice(0)
    setCode('')
    setImage(null)
    setCategoryName('')
    setCategoryIndex(0)
  }

  const onItemSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    if (categoryName === '') {
      alert('You need to select a category.')
      return
    }
    if (name === '') {
      alert('Item name needs to be defined.')
      return
    }
    if (price === 0 || isNaN(price) || price == null) {
      alert('Price needs to be a number.')
      return
    }
    if (code === '') {
      alert('Code needs to be defined')
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
      setPrice(0)
      setCode('')
      setImage(null)
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

  return (
    <>
      <Text color='white' fontSize='lg'>
        New item
      </Text>
      <Select variant='primary' my={2} placeholder='Select type of drink'>
        {menu.map((category, i) => {
          return (
            <option
              key={category.name}
              onClick={() => {
                setCategoryIndex(i)
                setCategoryName(category.name)
              }}
              value={category.name}
            >
              {formatCategoryName(category.name)}
            </option>
          )
        })}
      </Select>
      <Input
        marginBottom={2}
        onChange={nameChange}
        placeholder='Item name'
        color='white'
        value={name}
      ></Input>
      <NumberInput
        marginBottom={2}
        onChange={priceChange}
        placeholder='Item price'
        min={1}
        color='white'
        value={isNaN(price) ? '' : price}
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
        color='white'
        value={code}
      ></Input>
      <>
        <Button
          mt={2}
          mb={2}
          variant='ghost'
          onClick={() => document.getElementById('file').click()}
          color='white'
          _hover={{ bg: 'white', color: 'accent' }}
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
      <Flex justifyContent='center'>
        <IconButton
          w='45%'
          marginRight={2}
          onClick={onItemSubmit}
          aria-label='Submit'
          icon={<CheckIcon />}
          color='accent'
          bg='background'
          _hover={{ bg: 'white' }}
        />
        <IconButton
          w='45%'
          marginLeft={1}
          onClick={onItemCancel}
          aria-label='Cancel'
          icon={<CloseIcon />}
          color='accent'
          bg='background'
          _hover={{ bg: 'white' }}
        />
      </Flex>
    </>
  )
}
