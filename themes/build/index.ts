import fs from 'fs-extra'
import path from 'path'
import themes from '../test'
import { stripIndent } from 'common-tags'
import prepareDir, { THEMES_DIR } from './helpers/prepareDir'

type Theme = Record<string, any>

prepareDir()
themes.forEach((theme) => {
  // создаем директорию под каждую тему
  const THEME_DIR = THEMES_DIR + `/${theme.themeName}`
  fs.mkdirSync(THEME_DIR)
  writeStyleFiles(theme, THEME_DIR)
})

function writeStyleFiles(theme: Theme, themeDir: string): any {
  const styleVariants = ['css', 'scss'] as const

  styleVariants.forEach((format) => {
    console.log(`...compile ${format}`)
    const fileName = `index.${format}`
    const filePath = path.resolve(themeDir, fileName)
    const content = compileStyles(theme, format)
    fs.writeFileSync(filePath, content)
    console.log(`${theme.themeName} ${fileName} compiled successfully`)
  })
}

// TODO: разбиение на блоки(цвета, типографика, бордеры и тд). Обработка объектов каждого блока
function compileStyles(theme: Theme, format: 'css' | 'scss'): string {
  let result = ''

  Object.keys(theme).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    result += `--inf-${key}: ${theme[key]};\n`
  })

  return stripIndent`
  :root {
    ${result.split('\n').join('\n    ')}}
  `
}
