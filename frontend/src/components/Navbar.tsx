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
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { styled } from '@mui/system'
import CartIcon from './CartIcon'
import Logo from './Logo'
import Toggledarkmode from './Toggledarkmode'
import LoginModal from './LoginModal'

const pages = ['home', 'products', 'about']
const settings = ['Profile', 'Login']

interface StyledAppBarProps {
  isScrolled?: boolean
}

const StyledAppBar = styled(AppBar)<StyledAppBarProps>(
  ({ theme, isScrolled }) => ({
    backgroundColor: isScrolled
      ? theme.palette.background.paper ?? 'rgba(255, 255, 255, 0.8)'
      : 'transparent',
    transition: 'background-color 0.3s ease-in-out',
    boxShadow: isScrolled ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    minHeight: '18vh'
  })
)

interface ElevationScrollProps {
  children: React.ReactElement
}

const ElevationScroll: React.FC<ElevationScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 25
  })

  return React.cloneElement(children, {
    isScrolled: trigger
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
      <StyledAppBar position='fixed'>
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
                        style={{
                          textDecoration: 'none',
                          color: 'text.primary'
                        }}
                      >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                      </Link>
                    </Typography>
                    <Toggledarkmode />
                    {/* Make sure to move to a better location */}
                  </MenuItem>
                ))}
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
                  color: 'text.primary',
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
                    sx={{ mx: 1, color: 'text.primary' }}
                    component={Link}
                    to={`/${page}`}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Button>
                ))}
              </Box>

              {/* Action buttons */}
              <IconButton sx={{ mx: 1, color: 'text.primary' }}>
                <SearchIcon />
              </IconButton>
              <CartIcon />
              <Tooltip title='User menu'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ mx: 1, color: 'text.primary' }}
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
                <LoginModal />
                <Toggledarkmode />
                {/* Make sure to move this button to a better location */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </ElevationScroll>
  )
}

export default Navbar
