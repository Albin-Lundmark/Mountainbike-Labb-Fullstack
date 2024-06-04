import React, { useEffect, useState } from 'react'
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
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='left' ref={ref} {...props} />
})

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const { cartItems, setCartItems } = useCart()
  const [cartItemsCount, setCartItemsCount] = useState(0)

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token')
    const endpoint = token
      ? 'http://localhost:8080/cart/auth'
      : 'http://localhost:8080/cart/guest'

    try {
      const response = await axios.get(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      setCartItemsCount(response.data.length)
      setCartItems(response.data)
    } catch (error) {
      console.error('Error fetching cart items:', error)
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [cartItems])

  const handleSubmit = async (values: CheckoutFormValues) => {
    try {
      await axios.post('http://localhost:8080/checkout', values)
      alert('Thanks for your order!')
      setCartItems([])
    } catch (error) {
      console.error('Error processing payment:', error)
      alert('Payment failed. Please try again.')
    }
  }

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required('Card number is required'),
    expiryDate: Yup.string().required('Expiry date is required'),
    cvv: Yup.string().required('CVV is required')
  })

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <DialogTitle>Cart</DialogTitle>
      <DialogContent>
        <Container>
          {cartItemsCount}
          <List>
            {cartItems &&
              cartItems.map(item => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} Price: $${item.price}`}
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
                  error={touched.cardNumber && !!errors.cardNumber}
                  helperText={touched.cardNumber && errors.cardNumber}
                />
                <Field
                  as={TextField}
                  name='expiryDate'
                  label='Expiry Date'
                  fullWidth
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
  )
}

export default Cart
