const getNameInitials = (fullName: string): string => {
  if (!fullName) return ''

  const nameParts = fullName.split(' ')

  const firstNameInitial = nameParts[1]?.charAt(0) || ''
  const lastNameInitial = nameParts[0]?.charAt(0) || ''

  const initials = `${lastNameInitial}${firstNameInitial}`.toUpperCase()

  return initials
}

export default getNameInitials
