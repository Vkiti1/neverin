import { FC, useRef } from 'react'
import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Box,
} from '@chakra-ui/react'
import { Cart } from 'components/Cart'
import { FiShoppingCart } from 'react-icons/fi'

export const GuestHeader: FC = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure()
  const btnRef = useRef()
  return (
    <Flex as='header' p={2} justifyContent='flex-end'>
      <IconButton
        size='lg'
        aria-label='Guest cart'
        variant='ghost'
        ref={btnRef}
        onClick={openDrawer}
        icon={<FiShoppingCart size={40} />}
      ></IconButton>
      <Drawer
        size='md'
        isOpen={isDrawerOpen}
        placement='right'
        onClose={closeDrawer}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your order</DrawerHeader>
          <DrawerBody>
            <Cart />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
