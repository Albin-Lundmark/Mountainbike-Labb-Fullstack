import { Link } from 'react-router-dom'
import { Button, Box, Grid, IconButton, Typography } from '@mui/material'
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'
import Logo from './Logo'

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 4,
        mt: 4,
        width: '100%',
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 2
        }}
      >
        <Logo />
      </Box>

      <Grid container spacing={2} justifyContent='center'>
        <Grid item>
          <Button variant='text' component={Link} to={'/home'}>
            Home
          </Button>
        </Grid>
        <Grid item>
          <Button variant='text' component={Link} to={'/products'}>
            Products
          </Button>
        </Grid>
        <Grid item>
          <Button variant='text' component={Link} to={'/about'}>
            About
          </Button>
        </Grid>
        <Grid item>
          <Button variant='text'>Privacy Policy</Button>
        </Grid>
        <Grid item>
          <Button variant='text'>Terms of Service</Button>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2
        }}
      >
        <IconButton href='https://facebook.com' target='_blank' rel='noopener'>
          <Facebook />
        </IconButton>
        <IconButton href='https://twitter.com' target='_blank' rel='noopener'>
          <Twitter />
        </IconButton>
        <IconButton href='https://instagram.com' target='_blank' rel='noopener'>
          <Instagram />
        </IconButton>
        <IconButton href='https://linkedin.com' target='_blank' rel='noopener'>
          <LinkedIn />
        </IconButton>
      </Box>

      <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Mountainbikers. All rights reserved.
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Established in 2024
      </Typography>
    </Box>
  )
}

export default Footer
