import { create } from '@storybook/theming'
// @ts-ignore
import logo from '../src/assets/images/logo.svg'

export default create({
  base: 'light',

  brandTitle: 'Infinitum UI',
  brandUrl: 'https://specdep.ru/',
  brandImage: logo,
  brandTarget: '_blank',

  colorSecondary: '#f53a3a',

  barTextColor: '#c8cacc',
  barHoverColor: '#f53a3a',
  barSelectedColor: '#f53a3a'
})
