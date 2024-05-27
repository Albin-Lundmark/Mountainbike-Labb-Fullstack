import Grid from '@mui/material/Grid'
import { useMediaQuery, createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme()

const Hero: React.FC = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <img
            src={imageUrl}
            alt='Hero'
            style={{
              width: '100%',
              height: 'auto'
            }}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Hero
