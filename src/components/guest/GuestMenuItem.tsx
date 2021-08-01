import { FC, useEffect, useState } from 'react'
import { useFirebase } from 'context/firebase-instance'
import { Box, Img, Text } from '@chakra-ui/react'
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
        w='150px'
        h='150px'
        p={4}
        onClick={() => addGuestOrder(itemPrice, itemName)}
        transition='0.2s ease all'
        borderRadius='5px'
        _active={{ border: '5px solid gray', width: '160px', height: '160px' }}
      >
        {imageSrc && (
          <Img loading='lazy' w='100%' height='90%' src={imageSrc} />
        )}
        <Text>
          {itemName} {itemPrice} kn{' '}
        </Text>
      </Box>
    </>
  )
}
