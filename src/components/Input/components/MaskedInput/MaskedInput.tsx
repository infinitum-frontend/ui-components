import { ReactElement, useEffect, useMemo, useState } from 'react'
import { InputProps } from 'Components/Input/types'
import Input from 'Components/Input/Input'
import { IMask, useIMask } from 'react-imask'

const MaskTypes: Record<string, IMask.AnyMaskedOptions> = {
  phone: {
    mask: '+{7}(000)000-00-00'
    // mask: [
    //   {
    //     mask: '+{7}(000)000-00-00'
    //   }
    //   // TODO: обсудить
    //   // {
    //   //   mask: '{8}(000)000-00-00',
    //   // },
    // ]
    // dispatch: (value, masked) => {
    //   const current = masked.value.concat(value)
    //   if (current.startsWith('+7(8') || current.startsWith('8')) {
    //     return masked.compiledMasks[1]
    //   }
    //
    //   return masked.compiledMasks[0]
    // }
  },
  code4Digits: {
    mask: '0 0 0 0'
  },
  cvc: {
    mask: '0 0 0'
  },
  email: {
    mask: /^\w*@?\w*\.?\w{0,4}$/
  },
  bankCard: {
    mask: '0000 0000 0000 0000'
  },
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  phoneOrEmail: {
    mask: [
      {
        mask: '+{7}(000)000-00-00'
      },
      {
        mask: /^\S*@?\S*$/
      }
    ]
  } as IMask.MaskedDynamicOptions
}

type MaskType = Exclude<MaskedInputProps['mask'], IMask.AllMaskedOptions> | ''

const getMaskDescription = (
  mask: MaskedInputProps['mask']
): {
  mask: IMask.AllMaskedOptions
  maskType: MaskType
  placeholder: string
} => {
  let maskType: MaskType = ''
  if (typeof mask === 'string') {
    maskType = mask
    mask = MaskTypes[mask] as IMask.AllMaskedOptions
    if (!mask) {
      console.error('No definition for mask ', maskType)
    }
  }

  let placeholder = ''
  switch (maskType) {
    case 'phone':
      placeholder = '+7(___)-___-__-__'
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
    case 'bankCard':
      placeholder = '____ ____ ____ ____'
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
    | 'bankCard'
    | IMask.AllMaskedOptions
  /** Событие изменения данных */
  onAccept?: (value: string) => void
  /** Событие успешного заполнения данных */
  onComplete?: (value: string) => void
}

// TODO: как работать с required, placeholder, minLength/maxLength, учитывая, что:
//  если поставить lazy: falze, в качестве значения будет устанавливаться плейсхолдер, и length всегда будет соответствующий
const MaskedInput = ({
  mask: maskProp,
  onAccept,
  onComplete,
  value: valueProp = '',
  placeholder: placeholderProp,
  ...props
}: MaskedInputProps): ReactElement => {
  const [lazy, setLazy] = useState(true)

  const { mask, maskType, placeholder } = useMemo(
    () => getMaskDescription(maskProp),
    [maskProp]
  )

  const { ref, value, setUnmaskedValue } = useIMask(
    { ...mask, lazy },
    {
      onAccept: (value, maskRef) => {
        let result = maskRef.unmaskedValue

        // TODO: если формат номера 10 знаков, это не нужно
        if (['phone', 'phoneOrEmail'].includes(maskType)) {
          result = result === '7' ? '' : result
        }
        onAccept?.(result)
      },
      onComplete: (value, maskRef) => {
        onComplete?.(maskRef.unmaskedValue)
      }
    }
  )

  // Если по какой то причине у нас размонтировался компонент(например, условный рендеринг), синхронизируем значение маски с пропом
  useEffect(() => {
    if (!value && valueProp) {
      setUnmaskedValue(valueProp)
    }
  }, [value])

  return (
    <Input
      {...props}
      ref={ref}
      value={value || valueProp}
      placeholder={placeholder || placeholderProp}
      onFocus={() => {
        setLazy(false)
      }}
      onBlur={() => {
        setLazy(true)
      }}
    />
  )
}

export default MaskedInput
