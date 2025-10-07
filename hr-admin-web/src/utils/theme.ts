// 生成颜色阶梯
export const generateColors = (primary: string) => {
  const colors = {
    primary: primary,
    'primary-light-3': lighten(primary, 0.3),
    'primary-light-5': lighten(primary, 0.5),
    'primary-light-7': lighten(primary, 0.7),
    'primary-light-8': lighten(primary, 0.8),
    'primary-light-9': lighten(primary, 0.9),
    'primary-dark-2': darken(primary, 0.2),
  }
  return colors
}

// 颜色变亮
export const lighten = (color: string, amount: number) => {
  const hex = color.replace('#', '')
  const num = parseInt(hex, 16)
  const r = (num >> 16) + Math.floor(255 * amount)
  const g = ((num >> 8) & 0x00ff) + Math.floor(255 * amount)
  const b = (num & 0x0000ff) + Math.floor(255 * amount)
  return `#${(
    0x1000000 +
    (r < 255 ? r : 255) * 0x10000 +
    (g < 255 ? g : 255) * 0x100 +
    (b < 255 ? b : 255)
  )
    .toString(16)
    .slice(1)}`
}

// 颜色变暗
export const darken = (color: string, amount: number) => {
  const hex = color.replace('#', '')
  const num = parseInt(hex, 16)
  const r = (num >> 16) - Math.floor(255 * amount)
  const g = ((num >> 8) & 0x00ff) - Math.floor(255 * amount)
  const b = (num & 0x0000ff) - Math.floor(255 * amount)
  return `#${(0x1000000 + (r > 0 ? r : 0) * 0x10000 + (g > 0 ? g : 0) * 0x100 + (b > 0 ? b : 0))
    .toString(16)
    .slice(1)}`
}
