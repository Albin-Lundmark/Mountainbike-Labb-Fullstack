import React, { useEffect, useState } from 'react'
import { Badge, Snackbar, Alert, AlertProps } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import axios from 'axios'
import Cart from './Cart'
import { useCart } from '../context/useCart'
import { createPortal } from 'react-dom'
//CreatePortal was me trying to bypass every css and parent/child problem that occurred
//when trying to show an alert with feedback wether you'd successfully completed your order
//or if something went wrong but I still haven't gotten it to work

const CartIcon: React.FC = () => {
  const { cartItems, setCartItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [alertSeverity, setAlertSeverity] =
    useState<AlertProps['severity']>('success')
  const [alertMessage, setAlertMessage] = useState('')

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handlePaymentSuccess = (message: string) => {
    setAlertSeverity('success')
    setAlertMessage(message)
    setOpenSnackbar(true)
  }

  const handlePaymentError = (message: string) => {
    setAlertSeverity('error')
    setAlertMessage(message)
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token')
      const endpoint = '/cart'

      if (token) {
        try {
          const response = await axios.get(endpoint, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          })
          console.log('Response data: ', response.data)
          setCartItems(response.data)
        } catch (error) {
          console.error('Error fetching cart items:', error)
        }
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]')
        setCartItems(guestCart)
      }
    }
    fetchCartItems()
  }, [])

  useEffect(() => {
    const totalItems = Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => {
          return total + item.quantity
        }, 0)
      : 0
    localStorage.setItem('cartItemCount', totalItems.toString())
  }, [cartItems])

  return (
    <>
      <Badge
        color='warning'
        badgeContent={localStorage.getItem('cartItemCount') || '0'}
      >
        <ShoppingCartIcon onClick={handleCartClick} />
      </Badge>
      <Cart
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onPaymentError={handlePaymentError}
        onPaymentSuccess={handlePaymentSuccess}
      />
      {/* Still haven't figured out how to get this Snackbar to show at all. It is
      supposed to show an alert if you've completed an order instead of using
      alert() for it */}
      {createPortal(
        <Snackbar
          open={openSnackbar}
          autoHideDuration={10000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            position: 'fixed',
            bottom: '16px',
            left: '50%',
            width: '80vw',
            transform: 'translateX(-50%)',
            zIndex: 9999
          }}
        >
          <Alert
            variant='outlined'
            onClose={handleCloseSnackbar}
            severity={alertSeverity}
            sx={{
              width: '100%',
              backgroundColor: 'success.dark'
            }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>,
        document.body
      )}
    </>
  )
}

export default CartIcon
