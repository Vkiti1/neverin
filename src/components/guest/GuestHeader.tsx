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
  Button,
} from '@chakra-ui/react'
import { Cart } from 'components/guest/Cart'
import { FiShoppingCart } from 'react-icons/fi'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { useReceipts } from 'context/receipts'
import firebase from 'firebase'

export const GuestHeader: FC = () => {
  const { table, shopId } = useReceipts()
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure()
  const btnRef = useRef()

  const callAWaiter = async () => {
    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('notifications')
        .add({
          table,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Flex
      backgroundColor='theme.colors.header'
      as='header'
      p={4}
      justifyContent='space-between'
      bg='accent'
      position='sticky'
      top='0'
    >
      <Button
        bg='gray.100'
        size='lg'
        onClick={callAWaiter}
        variant='ghost'
        color='text'
        fontWeight='400'
      >
        Call a waiter
      </Button>
      <IconButton
        color='white'
        size='lg'
        aria-label='Guest cart'
        variant='ghost'
        ref={btnRef}
        onClick={openDrawer}
        icon={<FiShoppingCart size={40} />}
      ></IconButton>
      <Drawer
        size='full'
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
