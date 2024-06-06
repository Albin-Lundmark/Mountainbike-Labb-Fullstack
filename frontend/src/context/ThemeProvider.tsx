import * as React from 'react'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeContext from './ThemeContext'
import { useMediaQuery } from '@mui/material'

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const prefersSystemDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [prefersDarkMode, setPrefersDarkMode] =
    React.useState(prefersSystemDark)

  const theme = React.useMemo(() => {
    let theme = createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light'
      },
      typography: {
        fontFamily: [
          'Quicksand',
          'sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join('')
      }
    })
    theme = responsiveFontSizes(theme)
    return theme
  }, [prefersDarkMode])

  const toggleTheme = () => {
    setPrefersDarkMode(!prefersDarkMode)
  }

  return (
    <ThemeContext.Provider value={{ prefersDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default CustomThemeProvider
