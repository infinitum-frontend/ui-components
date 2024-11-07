import { create } from '@storybook/theming'
// @ts-ignore
import logo from '../src/assets/images/logo.svg'

export const ThemeLight = create({
  base: 'light',

  brandTitle: 'Infinitum UI',
  brandUrl: 'https://specdep.ru/',
  brandImage: logo,
  brandTarget: '_blank'

  // colorPrimary: '#f53a3a',

  // barTextColor: '#c8cacc',
  // barSelectedColor: '#f53a3a'
})

export const ThemeDark = create({
  base: 'dark'
})

export const themes = {
  light: ThemeLight,
  dark: ThemeDark
}
