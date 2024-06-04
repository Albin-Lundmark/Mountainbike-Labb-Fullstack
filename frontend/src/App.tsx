import * as React from 'react'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import CustomThemeProvider from './context/ThemeProvider'
import { CartProvider } from './context/CartContext'

const Root: React.FC = () => {
  return (
    <CustomThemeProvider>
      <CartProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </CustomThemeProvider>
  )
}

const App: React.FC = () => {
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
