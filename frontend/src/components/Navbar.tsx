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
    [theme.breakpoints.up('sm')]: {
      minHeight: '12vh'
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '12vh'
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '15vh'
    }
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
                component={CartIcon}
                sx={{ display: { md: 'none' } }}
              ></IconButton>
              {/* Logo and site name */}
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Logo />
              </Box>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {pages.map(page => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={`/${page}`}
                      sx={{ textDecoration: 'none', color: 'text.primary' }}
                    >
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                    </Typography>
                  </MenuItem>
                ))}
                <LoginModal />
                <Toggledarkmode />
              </Menu>
              <IconButton
                size='large'
                aria-label='menu'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                sx={{ display: { md: 'none' }, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
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
                {/* Action buttons */}
                <IconButton sx={{ mx: 1, color: 'text.primary' }}>
                  <SearchIcon />
                </IconButton>
                <IconButton
                  component={CartIcon}
                  sx={{ mx: 1, color: 'text.primary' }}
                ></IconButton>
                <Tooltip title='User menu'>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ mx: 1, color: 'text.primary' }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
              </Box>

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
                <LoginModal />
                <Toggledarkmode />
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </ElevationScroll>
  )
}

export default Navbar
