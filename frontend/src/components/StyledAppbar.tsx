import AppBar from '@mui/material/AppBar'
import { styled } from '@mui/system'

interface StyledAppBarProps {
  isScrolled?: boolean
  className?: string
  children: React.ReactNode
}

const StyledAppBar = styled(({ className, children }: StyledAppBarProps) => (
  <AppBar className={className}>{children}</AppBar>
))<StyledAppBarProps>(({ theme, isScrolled }) => ({
  backgroundColor: isScrolled
    ? theme.palette.background.paper ?? 'rgba(255, 255, 255, 0.8)'
    : 'transparent',
  position: 'fixed',
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
}))

export default StyledAppBar
