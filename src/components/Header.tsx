import { FC } from 'react'
import { Flex } from '@chakra-ui/layout'
import { AdminMenu } from 'components/AdminMenu'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import React from 'react'

interface Props {
  id: string
}

export const Header: FC<Props> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  return (
    <header>
      <Flex justifyContent='flex-end'>
        <Button ref={btnRef} onClick={onOpen}>
          Menu
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <AdminMenu id={id} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </header>
  )
}
