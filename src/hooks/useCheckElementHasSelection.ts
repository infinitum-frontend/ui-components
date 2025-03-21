export default function useCheckSelection(): (cssSelector: string) => boolean {
  // https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors
  function checkSelection(cssSelector: string): boolean {
    const currentSelection = document.getSelection() // данные о текущей селекции
    const currentSelectionLength = currentSelection?.toString().length || 0
    const focusEndsOnElement = currentSelection?.focusNode?.parentElement // информация об элементе, в котором селекция ЗАКАНЧИВАЕТСЯ (т.е. пользователь отпустил кнопку)

    if (
      currentSelectionLength &&
      focusEndsOnElement &&
      focusEndsOnElement.closest(cssSelector)
    ) {
      return true
    } else {
      return false
    }
  }

  return checkSelection
}
