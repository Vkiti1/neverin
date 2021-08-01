import { FC, useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/layout'
import { AdminMenu } from 'components/admin/AdminMenu'
import { Receipts } from 'components/admin/Receipts'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
} from '@chakra-ui/react'
import { useReceipts } from 'context/receipts'
import { AuthButton } from '../AuthButton'
import { Notifications } from 'components/admin/Notifications'
import { GrNotification } from 'react-icons/gr'
import { useFirebase } from 'context/firebase-instance'

interface Props {
  shopName: string
}

export const Header: FC<Props> = ({ shopName }) => {
  const firebaseInstance = useFirebase()

  const [notify, setNotify] = useState<boolean>(false)

  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure()

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure()

  const { shopId } = useReceipts()
  useEffect(() => {
    const unsubscribe = firebaseInstance
      .firestore()
      .collection('shops')
      .doc(shopId)
      .collection('notifications')
      .onSnapshot((notifications) =>
        notifications.docChanges().map((change) => {
          if (change.type === 'added') {
            setNotify(true)
          }
        })
      )

    setNotify(false)

    return () => unsubscribe()
  }, [])
  return (
    <Flex as='header' alignItems='center' p={4}>
      <Box>
        <Heading>{shopName}</Heading>
      </Box>
      <Box ml='auto'>
        <Popover>
          <PopoverTrigger>
            <IconButton
              icon={<GrNotification />}
              aria-label='notification button'
              onClick={() => setNotify(false)}
              bg={notify ? 'red' : 'gray'}
              color='white'
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Notifications</PopoverHeader>
            <PopoverBody>
              <Notifications />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button variant='ghost' onClick={openDrawer}>
          Receipts
        </Button>
        <Drawer
          size='md'
          isOpen={isDrawerOpen}
          placement='right'
          onClose={closeDrawer}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Receipts</DrawerHeader>
            <DrawerBody>
              <Receipts />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Button variant='ghost' onClick={openModal}>
          Menu
        </Button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Menu</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AdminMenu shopId={shopId} />
            </ModalBody>
            <Button onClick={closeModal}>Close</Button>
          </ModalContent>
        </Modal>
        <AuthButton variant='ghost' />
      </Box>
    </Flex>
  )
}
