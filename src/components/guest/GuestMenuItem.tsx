import { FC, useEffect, useState } from 'react'
import { useFirebase } from 'context/firebase-instance'
import { Box, Img, Text, Flex } from '@chakra-ui/react'
import { useReceipts } from 'context/receipts'

interface Props {
  itemPrice: number
  itemName: string
  imageUrl: string
}

export const GuestMenuItem: FC<Props> = ({ itemPrice, imageUrl, itemName }) => {
  const [imageSrc, setImageSrc] = useState(null)
  const { addGuestOrder } = useReceipts()
  const firebaseInstance = useFirebase()

  useEffect(() => {
    const getImage = async () => {
      const imageSrc = await firebaseInstance
        .storage()
        .ref()
        .child(imageUrl)
        .getDownloadURL()
      setImageSrc(imageSrc)
    }

    getImage()
  }, [])

  return (
    <>
      <Box
        minHeight='200px'
        p={4}
        onClick={() => addGuestOrder(itemPrice, itemName)}
        boxShadow='lg'
        border='1px solid lightgray'
        textAlign='center'
        bg='#fff'
      >
        {imageSrc && (
          <Img
            loading='lazy'
            width='120px'
            height='120px'
            objectFit='cover'
            src={imageSrc}
          />
        )}
        <Flex direction='column' mt={2}>
          <Text color='text' fontSize='lg' fontWeight='600'>
            {itemName}
          </Text>
          <Text color='text' fontSize='md'>
            {itemPrice} kn
          </Text>
        </Flex>
      </Box>
    </>
  )
}
