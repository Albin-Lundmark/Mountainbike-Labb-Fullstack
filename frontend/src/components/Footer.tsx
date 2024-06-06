import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

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
        <Button
          sx={{ marginBottom: 5 }}
          variant='text'
          component={Link}
          to={'/home'}
        >
          Home
        </Button>
        <Button
          sx={{ marginBottom: 5 }}
          variant='text'
          component={Link}
          to={'/products'}
        >
          Products
        </Button>
        <Button
          sx={{ marginBottom: 5 }}
          variant='text'
          component={Link}
          to={'/about'}
        >
          About
        </Button>
      </div>
    </>
  )
}

export default Footer
