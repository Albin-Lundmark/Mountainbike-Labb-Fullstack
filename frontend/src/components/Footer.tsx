import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <Link to={'/home'}>Home</Link>
      <Link to={'/products'}>Products</Link>
      <Link to={'/about'}>About</Link>
    </>
  )
}

export default Footer
