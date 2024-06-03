import React from 'react'
import { IconButton, Typography } from '@mui/material'
import { Brightness2, Brightness7 } from '@mui/icons-material'
import { useThemeContext } from '../context/ThemeContext'

const Toggledarkmode: React.FC = () => {
  const { prefersDarkMode, toggleTheme } = useThemeContext()

  return (
    <div>
      <IconButton onClick={toggleTheme} color='inherit'>
        {prefersDarkMode ? <Brightness7 /> : <Brightness2 />}
        <Typography variant='caption'>
          {prefersDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Typography>
      </IconButton>
    </div>
  )
}

export default Toggledarkmode
