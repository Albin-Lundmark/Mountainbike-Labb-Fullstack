import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CartIcon from './CartIcon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logo from './Logo'
import Toggledarkmode from './Toggledarkmode'
import LoginModal from './LoginModal'

const pages = ['home', 'products', 'about']
const settings = ['Profile', 'Login']

const ElevationScroll: React.FC<{ children: React.ReactElement }> = ({
  children
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  return React.cloneElement(children, {
    elevation: trigger ? 5 : 0
  })
}

const Navbar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <ElevationScroll>
      <AppBar position='sticky'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {/* Navigation for mobile */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <IconButton
                size='large'
                aria-label='menu'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {pages.map(page => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography variant='inherit'>
                      <Link
                        to={`/${page}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
                <Toggledarkmode />
                {/* Make sure to move to a better location */}
              </Menu>
              {/* Logo and site name */}
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{
                  ml: { md: 2 },
                  flexGrow: 1,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                <Logo />
              </Typography>
            </Box>

            {/* Navigation for desktop */}
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {pages.map(page => (
                  <Button
                    key={page}
                    sx={{ mx: 1, color: 'white' }}
                    component={Link}
                    to={`/${page}`}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Button>
                ))}
              </Box>

              {/* Action buttons */}
              <IconButton sx={{ mx: 1, color: 'white' }}>
                <SearchIcon />
              </IconButton>
              <CartIcon />
              <LoginModal />
              <Tooltip title='User menu'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ mx: 1, color: 'white' }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              {/* User settings menu */}
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
                <Toggledarkmode />
                {/* Make sure to move this button to a better location */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  )
}

export default Navbar
