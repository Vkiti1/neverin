import { GetServerSideProps, NextPage } from 'next'
import { GuestMenu } from 'components/guest/GuestMenu'
import { GuestHeader } from 'components/guest/GuestHeader'
import { ReceiptsProvider } from 'context/receipts'
import { useAuth } from 'context/auth'
import { useEffect, useState } from 'react'
import { firebaseInstance } from 'util/firebase-server-side-instance'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

interface Props {
  shopId: string
  table: number
  location: { lat: number; long: number }
}
const GuestPage: NextPage<Props> = ({ shopId, table, location }) => {
  const { loginAnonymously } = useAuth()
  const [shouldLoad, setShouldLoad] = useState<boolean>(false) //TODO: vrati na false
  const router = useRouter()

  useEffect(() => {
    if (typeof table !== 'number') {
      alert('No table number given')
      router.push('/')
    }

    const signIn = async () => {
      await loginAnonymously()
      setShouldLoad(true)
    }

    const checkLocation = () => {
      alert(
        'To use this service we need to know your location to prevent malicious use'
      )
      const onSuccess: PositionCallback = (e) => {
        function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
          var R = 6371 // Radius of the earth in km
          var dLat = deg2rad(lat2 - lat1) // deg2rad below
          var dLon = deg2rad(lon2 - lon1)
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2)
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          var d = R * c * 1000 // Distance in m
          return d
        }

        function deg2rad(deg) {
          return deg * (Math.PI / 180)
        }
        if (
          getDistanceFromLatLonInM(
            location.lat,
            location.long,
            e.coords.latitude,
            e.coords.longitude
          ) <= 50
        ) {
          signIn()
        } else {
          alert('You must be in the shop to use this service')
          router.push('/')
        }
      }

      const onError = () => {
        alert(
          'To use this service you must enable location features. If you enabled location features and cannot access the web page please try again.'
        )
        router.push('/')
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }

    checkLocation()
  }, [])

  return shouldLoad ? (
    <ReceiptsProvider shopId={shopId} table={table}>
      <GuestHeader />
      <GuestMenu shopId={shopId} />
    </ReceiptsProvider>
  ) : null
}

export default GuestPage

interface Params {
  [key: string]: string
  id: string
}

interface Query {
  [key: string]: string
  id: string
  table: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
  query,
}) => {
  const { table } = query as Query

  const shop = await firebaseInstance
    .firestore()
    .collection('shops')
    .doc(params.id)
    .get()
  const location = {
    lat: shop.data().location.latitude,
    long: shop.data().location.longitude,
  }

  return {
    props: {
      shopId: params.id,
      table: parseInt(table),
      location,
    },
  }
}
