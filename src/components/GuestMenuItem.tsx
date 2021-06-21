import { FC, useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { Box, Img, Text } from '@chakra-ui/react'

interface Props {
  itemPrice: number
  itemName: string
  imageUrl: string
}

export const GuestMenuItem: FC<Props> = ({ itemPrice, imageUrl, itemName }) => {
  const [image, setImage] = useState(null)
  const fetchImage = () => {
    return new Promise((resolve, reject) => {
      if (imageUrl !== '') {
        resolve(
          firebaseInstance.storage().ref().child(`${imageUrl}`).getDownloadURL()
        )
      }
      reject = (err) => console.error(err)
    })
  }

  const wait = async () => {
    const result = (await fetchImage()) as string
    return result
  }

  useEffect(() => {
    wait().then((data) => {
      // @ts-ignore
      const picture = new Image()
      picture.setAttribute('src', data)
      setImage(picture)
    })
  }, [])

  const handleClick = () => {
    console.log('click')
  }

  return (
    <>
      <Box p={4} onClick={handleClick}>
        {image ? (
          <Img
            w='125px'
            h='125px'
            src={image.src}
            transition='1s ease-in'
            _active={{ border: '2px solid red', borderRadius: '5px' }}
            _pressed={{ border: '2px solid red', borderRadius: '5px' }}
          />
        ) : null}
        <Text>
          {itemName} {itemPrice} kn{' '}
        </Text>
      </Box>
    </>
  )
}
