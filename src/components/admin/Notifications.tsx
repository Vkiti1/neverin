import { FC, useEffect, useState } from 'react'
import { useFirebase } from 'context/firebase-instance'
import { useReceipts } from 'context/receipts'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
export const Notifications: FC = () => {
  const firebaseInstance = useFirebase()
  const { shopId } = useReceipts()
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    const unsubscribe = firebaseInstance
      .firestore()
      .collection('shops')
      .doc(shopId)
      .collection('notifications')
      .onSnapshot((notifications) =>
        setNotifications(
          notifications.docs.map((notification) => ({
            id: notification.id,
            ...notification.data(),
          }))
        )
      )

    return () => unsubscribe()
  }, [])

  const deleteNotification = async (id) => {
    try {
      await firebaseInstance
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('notifications')
        .doc(id)
        .delete()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {notifications.map((notification) => (
        <Box key={notification.id}>
          <Text>
            Table number {notification.table} needs waiter assistance.
          </Text>
          <IconButton
            aria-label='clear notification'
            icon={<AiOutlineCheckCircle />}
            onClick={() => deleteNotification(notification.id)}
          />
        </Box>
      ))}
    </>
  )
}
