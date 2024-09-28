export function formatDamage(num: number) {
  if (num < 1000) return num.toString()

  const units = ['k', 'm', 'b']
  const base = 1000

  let index = -1
  let formattedNumber = num

  while (formattedNumber >= base && index < units.length - 1) {
    formattedNumber /= base
    index++
  }

  return formattedNumber.toFixed(1).replace(/\.0$/, '') + units[index]
}
