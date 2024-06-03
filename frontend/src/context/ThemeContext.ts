import * as React from 'react'

interface ThemeContextType {
  prefersDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
)

export const useThemeContext = (): ThemeContextType => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
