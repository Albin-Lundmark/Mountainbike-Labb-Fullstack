import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
  SlideProps,
  IconButton
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
      errors.password = 'Required'
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
      const response = await axios.post<LoginResponse>('/login', {
        email: values.email,
        password: values.password
      })
      localStorage.setItem('token', response.data.token)
      setIsLoggedIn(true)
      setOpen(false)
    } catch (err) {
      setErrors({
        email: 'Invalid username or password',
        password: 'Invalid username or password'
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
      const response = await axios.post<LoginResponse>('/register', {
        email: values.email,
        password: values.password
      })
      localStorage.setItem('token', response.data.token)
      setIsLoggedIn(true)
      setOpen(false)
    } catch (err) {
      setErrors({
        password: 'Something went wrong with the registration, please try again'
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
    <div>
      {!isLoggedIn ? (
        <div>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpen(true)}
          >
            Login/Register
          </Button>
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
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <label htmlFor='email'>Email:</label>
                      <Field type='text' name='email' id='email' required />
                      <ErrorMessage name='email' component='div' />
                    </div>
                    <div>
                      <label htmlFor='password'>Password:</label>
                      <Field
                        type='password'
                        name='password'
                        id='password'
                        required
                      />
                      <ErrorMessage name='password' component='div' />
                    </div>
                    {isRegister && (
                      <div>
                        <label htmlFor='confirmPassword'>
                          Confirm Password:
                        </label>
                        <Field
                          type='password'
                          name='confirmPassword'
                          id='confirmPassword'
                          required
                        />
                        <ErrorMessage name='confirmPassword' component='div' />
                      </div>
                    )}
                    <div>
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
                    </div>
                    <div>
                      <Button type='button' onClick={toggleForm}>
                        {isRegister
                          ? 'Already have an account? Login'
                          : `Don't have an account yet? Register`}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          <Button variant='contained' color='secondary' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}

export default LoginModal
