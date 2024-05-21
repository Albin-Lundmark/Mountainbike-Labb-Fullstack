import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Mountainbikers
        </Typography>
        <Button color='inherit' component={RouterLink} to='/'>
          Home
        </Button>
        <Button color='inherit' component={RouterLink} to='/products'>
          Products
        </Button>
        <Button color='inherit' component={RouterLink} to='/about'>
          About
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
