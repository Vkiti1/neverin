import { FC, useRef } from 'react'
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
  const { shopId } = useReceipts()
  const btnRef = useRef()
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
