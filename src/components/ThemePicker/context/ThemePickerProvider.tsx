// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect
} from 'react'

interface ThemePickerContextType {
  theme?: 'light' | 'dark'
  toggleTheme?: () => void
}

const defaultContext: ThemePickerContextType = {
  theme: 'light',
  toggleTheme: () => {}
}

export const ThemePickerContext =
  createContext<ThemePickerContextType>(defaultContext)

export const ThemePickerProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  )

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('inf-ui-theme-dark')
    } else {
      document.body.classList.remove('inf-ui-theme-dark')
    }
  }, [theme])

  const toggleTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  return (
    <ThemePickerContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemePickerContext.Provider>
  )
}
