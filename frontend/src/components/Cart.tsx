import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

interface CartItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface CheckoutFormValues {
  cardNumber: string
  expiryDate: string
  cvv: string
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cart')
        setCartItems(response.data)
      } catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }

    fetchCartItems()
  }, [])

  const handleSubmit = async (values: CheckoutFormValues) => {
    try {
      await axios.post('http://localhost:8080/checkout', values)
      alert('Payment successful!')
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
    <Container>
      <Typography variant='h4' gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cartItems.map(item => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity} Price: $${item.price}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant='h6'>
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
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
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Checkout
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default Cart
