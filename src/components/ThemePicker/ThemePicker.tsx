// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, useContext } from 'react'
import { Button } from 'Components/Button'
import { ReactComponent as LightThemeIcon } from 'Icons/sun.svg'
import { ReactComponent as DarkThemeIcon } from 'Icons/moon.svg'
import { ThemePickerContext } from './context/ThemePickerProvider'

const ThemePicker = (): ReactElement => {
  const { theme, toggleTheme } = useContext(ThemePickerContext)

  return (
    <Button
      variant="ghost"
      icon={
        theme === 'light' ? (
          <DarkThemeIcon color={'#A0A0A0'} />
        ) : (
          <LightThemeIcon color={'#ADADAD'} />
        )
      }
      onClick={toggleTheme}
    />
  )
}

export default ThemePicker
