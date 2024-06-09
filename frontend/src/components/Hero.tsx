import { Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme, useMediaQuery } from '@mui/material'

const Hero: React.FC = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isDarkMode = theme.palette.mode === 'dark'

  let imageUrl =
    'https://plus.unsplash.com/premium_photo-1663013202808-618f17b19d95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  if (isDesktop) {
    imageUrl =
      'https://images.unsplash.com/photo-1572852066354-b5bd0191261b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  } else if (isTablet) {
    imageUrl =
      'https://plus.unsplash.com/premium_photo-1663013202808-618f17b19d95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  } else if (isMobile) {
    imageUrl =
      'https://images.unsplash.com/photo-1596477595048-35cf66f74c8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5iaWtlfGVufDB8fDB8fHww'
  }

  return (
    <Grid
      container
      justifyContent='center'
      sx={{
        backgroundImage: `url(${imageUrl})`,
        borderImage: isDarkMode
          ? 'fill 0 linear-gradient(#000000c0, #9d9d9d10)'
          : 'fill 0 linear-gradient(#ffffffc0, #ffffff10)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh'
      }}
    >
      <Grid item xs={'auto'}>
        <Button
          variant='contained'
          color='success'
          component={Link}
          to={'/products'}
          sx={{
            fontSize: isMobile
              ? '1rem'
              : isTablet
              ? '1.2rem'
              : isDesktop
              ? '1.5rem'
              : '1.5rem',
            position: 'relative',
            top: '70vh',
            cursor: 'pointer'
          }}
        >
          See our products
        </Button>
      </Grid>
    </Grid>
  )
}

export default Hero
