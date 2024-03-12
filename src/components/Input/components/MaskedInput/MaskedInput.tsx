import { ReactElement, Ref, useEffect, useMemo } from 'react'
import { InputProps } from 'Components/Input/types'
import { ExtractMaskOpts, ReactMaskOpts, useIMask } from 'react-imask'
import Input from 'Components/Input/Input'
import useIsFirstRender from 'Hooks/useIsFirstRender'

type MaskType = 'phone' | 'code4Digits' | 'cvc' | 'email' | 'phoneOrEmail'

function preparePhoneValue(value: string): string {
  const digitsOnlyValue = value.replaceAll(/\D/g, '')
  if (digitsOnlyValue?.length === 11 && digitsOnlyValue.startsWith('8')) {
    return digitsOnlyValue.substring(1)
  }

  return value
}

const MaskTypes: Record<MaskType, ReactMaskOpts> = {
  phone: {
    mask: [
      {
        mask: '+{7}(000)000-00-00'
      }
    ],
    prepare: preparePhoneValue
  },
  code4Digits: {
    mask: '0000'
  },
  cvc: {
    mask: '000',
    displayChar: '*'
  },
  email: {
    mask: /^\w*@?\w*\.?\w{0,4}$/
  },
  // bankCard: {
  //   mask: '0000 0000 0000 0000'
  // },
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  phoneOrEmail: {
    mask: [
      {
        mask: '+{7}(000)000-00-00'
      },
      {
        mask: /^\S*@?\S*$/
      }
    ],
    prepare: preparePhoneValue,
    dispatch: (value, masked, flags, tail) => {
      // const lettersRegex = /[^+(\d)]+/
      const lettersRegex = /[a-zA-Z]/
      // @ts-expect-error
      const tailValue = tail?.value || ''
      const nextValue = masked.unmaskedValue.concat(value)

      if (lettersRegex.test(nextValue) || lettersRegex.test(tailValue)) {
        return masked.compiledMasks[1]
      }

      return masked.compiledMasks[0]
    }
  }
}

const getMaskDescription = (
  maskProp: MaskedInputProps['mask']
): {
  mask: ReactMaskOpts
  maskType: MaskType | ''
  placeholder: string
} => {
  let maskType: MaskType | '' = ''
  let mask: ReactMaskOpts
  if (typeof maskProp === 'string') {
    maskType = maskProp
    mask = MaskTypes[maskProp]
    if (!mask) {
      console.error('No definition for mask ', maskType)
    }
  } else {
    mask = maskProp as ReactMaskOpts
  }

  let placeholder = ''
  switch (maskType) {
    case 'phone':
      placeholder = '+7(___)___-__-__'
      break
    case 'phoneOrEmail':
      placeholder = 'Email / Телефон'
      break
    case 'code4Digits':
      placeholder = '_ _ _ _'
      break
    case 'cvc':
      placeholder = '_ _ _'
      break
    case 'email':
      placeholder = 'example@mail.ru'
      break
  }

  return { mask, maskType, placeholder }
}

export type MaskedInputProps = Omit<InputProps, 'onChange'> & {
  /** Вариант маски либо объект с определнием маски согласно https://imask.js.org/ */
  mask:
    | 'phone'
    | 'code4Digits'
    | 'cvc'
    | 'email'
    | 'phoneOrEmail'
    | MaskedInputProps
  /** Событие изменения данных */
  onAccept?: (value: string) => void
  /** Событие успешного заполнения данных */
  onComplete?: (value: string) => void
}

// TODO: как работать с required, placeholder, minLength/maxLength, учитывая, что:
//  если поставить lazy: false, в качестве значения будет устанавливаться плейсхолдер, и length всегда будет соответствующий
const MaskedInput = ({
  mask: maskProp,
  onAccept,
  onComplete,
  value: valueProp = '',
  placeholder: placeholderProp,
  onFocus,
  onBlur,
  ...props
}: MaskedInputProps): ReactElement => {
  const isFirstRender = useIsFirstRender()
  const { mask, maskType, placeholder } = useMemo(
    () => getMaskDescription(maskProp),
    [maskProp]
  )

  const { ref, value, setUnmaskedValue, unmaskedValue } = useIMask(
    { ...mask },
    {
      onAccept: (value, maskRef, e) => {
        const isValueChanged = value !== valueProp

        if (isFirstRender && !isValueChanged) {
          return
        }

        let result = maskRef.unmaskedValue

        // TODO: если формат номера 10 знаков, это не нужно
        if (['phone', 'phoneOrEmail'].includes(maskType)) {
          result = result === '7' || result === '8' ? '' : result
        }
        onAccept?.(result)
      },
      onComplete: (value, maskRef) => {
        onComplete?.(maskRef.unmaskedValue)
      }
    }
  )

  // const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
  //   const mask = maskRef.current.masked.mask
  //   // Устанавливаем значение-плейсхолдер при фокусе
  //   // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  //   maskRef.current.updateOptions({
  //     lazy: false,
  //     mask: Array.isArray(mask)
  //       ? mask.map((m) => ({
  //           ...m,
  //           lazy: false
  //         }))
  //       : mask
  //   } as IMask.AnyMaskedOptions)
  //
  //   maskRef.current.alignCursor() // ставим курсор в правильное положение
  //
  //   onFocus?.(e)
  // }
  //
  // const handleBlur: FocusEventHandler<HTMLInputElement> = (e): void => {
  //   const mask = maskRef.current.masked.mask
  //   // Убираем значение-плейсхолдер при блюре
  //   // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  //   maskRef.current.updateOptions({
  //     lazy: true,
  //     mask: Array.isArray(mask)
  //       ? mask.map((m) => ({
  //           ...m,
  //           lazy: true
  //         }))
  //       : mask
  //   } as IMask.AnyMaskedOptions)
  //
  //   onBlur?.(e)
  // }

  useEffect(() => {
    // Если по какой то причине у нас размонтировался компонент(например, условный рендеринг), синхронизируем значение маски с пропом
    const shouldSyncExternalValue = !value && valueProp
    // чтобы ресетнуть плейсхолдер
    const shouldResetMask = value === '8(' && !valueProp

    if (shouldSyncExternalValue || shouldResetMask) {
      setUnmaskedValue(valueProp)
    }
  }, [value])

  useEffect(() => {
    // Если значение изменено снаружи, синхронизируем
    if (unmaskedValue !== valueProp) {
      setUnmaskedValue(valueProp)
    }
  }, [valueProp])

  const composedValue = value || valueProp

  return (
    // TODO: пока такое решение, будет коряво для инпута с displayChar. Может потом придет решение
    <Input
      {...props}
      ref={ref as unknown as Ref<HTMLInputElement>}
      value={composedValue}
      defaultValue={
        (mask as ExtractMaskOpts<any, any>).displayChar
          ? composedValue
          : undefined
      }
      placeholder={placeholder || placeholderProp}
      // onFocus={handleFocus}
      // onBlur={handleBlur}
    />
  )
}

export default MaskedInput
