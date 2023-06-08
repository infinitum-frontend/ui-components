type MaskInputType = 'phone' | 'email' | 'bankCard'

function bankCardMask(value: string | undefined): string | undefined {
  if (!value) return ''

  return (
    value
      .replace(/\s/g, '')
      .replace(/\D/g, '')
      .match(/.{1,4}/g)
      ?.join(' ')
      .substring(0, 19) || ''
  )
}

function phoneMask(value: string | undefined): string | undefined {
  if (!value) return ''

  function prefixNumber(str: string): string {
    if (str === '7') {
      return '7 ('
    }
    if (str === '8') {
      return '8 ('
    }
    if (str === '9') {
      return '7 (9'
    }
    return '7 ('
  }

  value = value.replace(/\D+/g, '')
  const numberLength = 11

  let result
  if (value.includes('+8') || value[0] === '8') {
    result = ''
  } else {
    result = '+'
  }

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i])
        continue
      case 4:
        result += ') '
        break
      case 7:
        result += '-'
        break
      case 9:
        result += '-'
        break
      default:
        break
    }
    result += value[i]
  }

  return result

  // return value
  //   ?.replace(/\D/g, '')
  //   .replace(/^(\d)/, '($1')
  //   .replace(/^(\(\d{2})(\d)/, '$1) $2')
  //   .replace(/(\d{4})(\d{1,5})/, '$1-$2')
  //   .replace(/(-\d{5})\d+?$/, '$1')
}

function maskInput(
  value: string | undefined,
  type: MaskInputType
): string | undefined {
  if (type === 'bankCard') {
    return bankCardMask(value)
  } else if (type === 'phone') {
    return phoneMask(value)
  }
  return value
}

export default maskInput
