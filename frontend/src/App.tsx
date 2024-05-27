import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

const Root = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Navbar />
      <main>
        <Outlet />
      </main>
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
