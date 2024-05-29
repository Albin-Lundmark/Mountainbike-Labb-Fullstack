import * as React from 'react'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const Root = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(() => {
    let theme = createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light'
      },
      typography: {
        fontFamily: [
          'Quicksand',
          'sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join('')
      }
    })
    theme = responsiveFontSizes(theme)
    return theme
  }, [prefersDarkMode])
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
    </>
  )
}

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { element: <Home />, path: '/' },
        { element: <Home />, path: '/home' },
        { element: <About />, path: '/about' },
        { element: <Products />, path: '/products' }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
