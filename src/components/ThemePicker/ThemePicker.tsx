// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, useContext } from 'react'
import { Button } from 'Components/Button'
import LightThemeIcon from 'Icons/sun.svg?react'
import DarkThemeIcon from 'Icons/moon.svg?react'
import { ThemePickerContext } from './context/ThemePickerProvider'

const ThemePicker = (): ReactElement => {
  const { theme, toggleTheme } = useContext(ThemePickerContext)

  return (
    <Button
      variant="ghost"
      icon={
        theme === 'light' ? (
          <DarkThemeIcon color="var(--inf-color-icon-primary)" />
        ) : (
          <LightThemeIcon color="var(--inf-color-icon-primary)" />
        )
      }
      onClick={toggleTheme}
    />
  )
}

export default ThemePicker
