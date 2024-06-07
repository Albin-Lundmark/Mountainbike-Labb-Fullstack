import React, { useEffect } from 'react'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Slide,
  SlideProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useCart } from '../context/useCart'

interface CheckoutFormValues {
  cardNumber: string
  expiryDate: string
  cvv: string
}

interface CartProps {
  open: boolean
  onClose: () => void
  onPaymentSuccess: (message: string) => void
  onPaymentError: (message: string) => void
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='left' ref={ref} {...props} />
})

const Cart: React.FC<CartProps> = ({
  open,
  onClose,
  onPaymentSuccess,
  onPaymentError
}) => {
  const { cartItems, setCartItems } = useCart()

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token')
    const endpoint = 'http://localhost:8080/cart'

    if (token) {
      try {
        const response = await axios.get(endpoint, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
        setCartItems(response.data)
      } catch (error) {
        console.error('Error fetching cart items:', error)
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]')
      setCartItems(guestCart)
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [cartItems])

  const handleSubmit = async (values: CheckoutFormValues) => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await axios.post('http://localhost:8080/checkout', values)
        onPaymentSuccess('Thank you for your order!')
        setCartItems([])
        onClose()
      } catch (error) {
        onPaymentError(
          'Something went wrong with your order, please try again.'
        )
        console.error('Error processing payment:', error)
      }
    }
    localStorage.removeItem('guestCart')
    setCartItems([])
    onClose()
  }

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required('Card number is required'),
    expiryDate: Yup.string().required('Expiry date is required'),
    cvv: Yup.string().required('CVV is required')
  })

  return (
    <>
      <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
        <DialogTitle>Cart</DialogTitle>
        <DialogContent>
          <Container>
            <List>
              {cartItems &&
                cartItems.map(item => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity} Price: ${item.price} kr`}
                    />
                  </ListItem>
                ))}
            </List>
            <Typography variant='h6'>
              Total:
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{' '}
            </Typography>
            <Formik
              initialValues={{ cardNumber: '', expiryDate: '', cvv: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    name='cardNumber'
                    label='Card Number'
                    fullWidth
                    sx={{ marginY: 1 }}
                    error={touched.cardNumber && !!errors.cardNumber}
                    helperText={touched.cardNumber && errors.cardNumber}
                  />
                  <Field
                    as={TextField}
                    name='expiryDate'
                    label='Expiry Date'
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    error={touched.expiryDate && !!errors.expiryDate}
                    helperText={touched.expiryDate && errors.expiryDate}
                  />
                  <Field
                    as={TextField}
                    name='cvv'
                    label='CVV'
                    fullWidth
                    error={touched.cvv && !!errors.cvv}
                    helperText={touched.cvv && errors.cvv}
                  />
                  <DialogActions>
                    <Button onClick={onClose} color='primary'>
                      Continue shopping
                    </Button>
                    <Button type='submit' variant='contained' color='primary'>
                      Checkout
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Cart
