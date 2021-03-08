export default class ColorHelper {
  static isBright(hexadecimalColor: string): boolean {
    const color = hexadecimalColor.substring(1) // strip #
    const rgb = parseInt(color, 16) // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff // extract red
    const g = (rgb >> 8) & 0xff // extract green
    const b = (rgb >> 0) & 0xff // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

    if (luma < 80) {
      return false
    }
    return true
  }
  static getRandomHexadecimalColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }
}
