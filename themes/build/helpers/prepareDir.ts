import fs from 'fs-extra'
import path from 'path'

export const ROOT_DIR = path.resolve('./')
export const DIST_DIR = ROOT_DIR + '/dist'
export const THEMES_DIR = DIST_DIR + '/themes'

/**
 * Подготовка директории dist к генерации в нее
 */
export default function prepareDir(): void {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR)
  }

  if (!fs.existsSync(THEMES_DIR)) {
    fs.mkdirSync(THEMES_DIR)
  }
}
