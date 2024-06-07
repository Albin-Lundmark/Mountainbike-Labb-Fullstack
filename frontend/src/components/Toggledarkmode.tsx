import React from 'react'
import { Button, Typography } from '@mui/material'
import { Brightness2, Brightness7 } from '@mui/icons-material'
import { useThemeContext } from '../context/ThemeContext'

const Toggledarkmode: React.FC = () => {
  const { prefersDarkMode, toggleTheme } = useThemeContext()

  return (
    <Button
      onClick={toggleTheme}
      variant='text'
      size='small'
      fullWidth
      sx={{ color: 'text.primary' }}
    >
      {prefersDarkMode ? <Brightness7 /> : <Brightness2 />}
      <Typography variant='caption'>
        {prefersDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Typography>
    </Button>
  )
}

export default Toggledarkmode
