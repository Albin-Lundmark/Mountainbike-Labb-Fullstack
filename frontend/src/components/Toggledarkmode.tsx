import React from 'react'
import { MenuItem, Typography } from '@mui/material'
import { Brightness2, Brightness7 } from '@mui/icons-material'
import { useThemeContext } from '../context/ThemeContext'

const Toggledarkmode: React.FC = () => {
  const { prefersDarkMode, toggleTheme } = useThemeContext()

  return (
    <MenuItem onClick={toggleTheme} sx={{ color: 'text.primary' }}>
      <Typography sx={{ mr: 1 }}>
        {prefersDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Typography>
      {prefersDarkMode ? <Brightness7 /> : <Brightness2 />}
    </MenuItem>
  )
}

export default Toggledarkmode
