import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Slide,
  SlideProps,
  IconButton,
  MenuItem
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface LoginResponse {
  token: string
}

interface AuthValues {
  email: string
  password: string
  confirmPassword?: string
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='left' ref={ref} {...props} />
})

const LoginModal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const initialValues: AuthValues = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validate = (values: AuthValues) => {
    const errors: Partial<AuthValues> = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    }
    if (isRegister && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must match'
    }
    return errors
  }

  const handleLoginSubmit = async (
    values: AuthValues,
    { setSubmitting, setErrors }: FormikHelpers<AuthValues>
  ) => {
    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:8080/login',
        {
          email: values.email,
          password: values.password
        }
      )
      localStorage.setItem('token', response.data.token)
      setIsLoggedIn(true)
      setOpen(false)
    } catch (err) {
      setErrors({
        email: 'Invalid email',
        password: 'Invalid password'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleRegisterSubmit = async (
    values: AuthValues,
    { setSubmitting, setErrors }: FormikHelpers<AuthValues>
  ) => {
    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:8080/register',
        {
          email: values.email,
          password: values.password
        }
      )
      localStorage.setItem('token', response.data.token)
      setIsLoggedIn(true)
      setOpen(false)
    } catch (err) {
      setErrors({
        email: 'Email might not be valid',
        password: 'Password might not be valid, please try again'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  const toggleForm = () => {
    setIsRegister(!isRegister)
  }

  return (
    <>
      {!isLoggedIn ? (
        <>
          <MenuItem
            onClick={() => setOpen(true)}
            sx={{
              color: 'text.primary'
            }}
          >
            Login/Register
          </MenuItem>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
            aria-describedby='Login and register form opened in a modal'
            fullWidth
            maxWidth='sm'
          >
            <DialogTitle>
              {isRegister ? 'Register' : 'Login'}
              <IconButton
                aria-label='close'
                onClick={() => setOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500]
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Field
                      as={TextField}
                      name='email'
                      type='text'
                      label='Email'
                      fullWidth
                      margin='normal'
                      error={touched.email && !!errors.email}
                    />
                    <ErrorMessage name='email' component='div' />

                    <Field
                      as={TextField}
                      name='password'
                      type='password'
                      label='Password'
                      fullWidth
                      margin='normal'
                      error={touched.password && !!errors.password}
                    />
                    <ErrorMessage name='password' component='div' />

                    {isRegister && (
                      <>
                        <Field
                          as={TextField}
                          name='confirmPassword'
                          type='password'
                          label='Confirm Password'
                          fullWidth
                          margin='normal'
                          error={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                        />
                        <ErrorMessage name='confirmPassword' component='div' />
                      </>
                    )}

                    <DialogActions>
                      <Button
                        type='button'
                        onClick={toggleForm}
                        color='primary'
                      >
                        {isRegister
                          ? 'Already have an account? Login'
                          : `Don't have an account yet? Register`}
                      </Button>
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? isRegister
                            ? 'Registering...'
                            : 'Logging in...'
                          : isRegister
                          ? 'Register'
                          : 'Login'}
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Button
            variant='text'
            size='small'
            sx={{
              cursor: 'pointer',
              color: 'text.primary'
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      )}
    </>
  )
}

export default LoginModal
