import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider
} from 'react-router-dom'

const Root = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

const App = () => {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <About />, path: '/about' },
        { element: <Products />, path: '/products' }
      ],
      element: <Root />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
