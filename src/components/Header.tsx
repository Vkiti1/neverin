import { FC } from 'react'
import { Flex } from '@chakra-ui/layout'
import { AdminMenu } from 'components/AdminMenu'
import { Receipts } from 'components/Receipts'
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
} from '@chakra-ui/react'
import React from 'react'
import { useReceipts } from 'context/receipts'
import { AuthButton } from './AuthButton'

interface Props {
  shopName
}

export const Header: FC<Props> = ({ shopName }) => {
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
  const { receipts, id } = useReceipts()
  const btnRef = React.useRef()
  return (
    <Flex as='header' alignItems='center' p={4}>
      <Box>
        <Heading>{shopName}</Heading>
      </Box>
      <Box ml='auto'>
        <Button variant='ghost' ref={btnRef} onClick={openDrawer}>
          Receipts
        </Button>
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
              <AdminMenu id={id} />
            </ModalBody>
            <Button onClick={closeModal}>Close</Button>
          </ModalContent>
        </Modal>
        <AuthButton variant='ghost' />
      </Box>
    </Flex>
  )
}
