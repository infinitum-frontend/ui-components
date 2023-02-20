export function bankCardMask(value: string | undefined): string | undefined {
  return (
    value
      ?.replace(/\s/g, '')
      ?.match(/.{1,4}/g)
      ?.join(' ')
      .substring(0, 19) || ''
  )
}
