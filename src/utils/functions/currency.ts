export const displayPrice = (cents: number): string => {
  const centsStr = cents.toString()
  const priceStr = centsStr.slice(0, -2).concat(".").concat(centsStr.slice(-2))
  return `$${priceStr}`
}
