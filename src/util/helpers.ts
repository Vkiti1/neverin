export const formatCategoryName = (name: string) => {
  let splitString = name.split(/(?=[A-Z])/g)

  return splitString
    .map((word, i) =>
      i === 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : word.toLowerCase()
    )
    .join(' ')
}
