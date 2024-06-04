import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          color: 'inherit'
        }}
      >
        <Link to={'/home'}>Home</Link>
        <Link to={'/products'}>Products</Link>
        <Link to={'/about'}>About</Link>
      </div>
    </>
  )
}

export default Footer
