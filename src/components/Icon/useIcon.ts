import { FunctionComponent, ReactSVGElement, useEffect, useRef, useState } from 'react'

// TODO: посмотреть React.lazy + <Suspense>. Проверить три шейкинг при использовании такого подхода, когда будем делать библиотеку иконок
export function useIcon(name: string): { Component: FunctionComponent<Partial<ReactSVGElement>> | undefined, isLoaded: boolean } {
  // используем стейт, чтобы триггерить ререндер после загрузки файла
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<FunctionComponent<Partial<ReactSVGElement>>>()

  useEffect(() => {
    setIsLoaded(false)

    const getIcon = async(iconName: string): Promise<any> => {
      try {
        ref.current = (await import(`../../icons/${iconName}.svg`)).ReactComponent
        setIsLoaded(true)
      } catch (error) {
        console.error(`Failed to dynamic import ${name}`)
      }
    }

    void getIcon(name)
  }, [name])

  return { Component: ref.current, isLoaded }
}
