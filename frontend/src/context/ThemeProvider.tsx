import * as React from 'react'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeContext from './ThemeContext'

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [prefersDarkMode, setPrefersDarkMode] = React.useState(false)

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
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default CustomThemeProvider
