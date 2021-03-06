import { colorPalette } from '../data/color.palette'
export default class ColorHelper {
  static isBright(hexadecimalColor) {
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
  static getRandomHexadecimalColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }
  static getColorFromColorPalette() {
    return colorPalette[Math.floor(Math.random() * 100000) % colorPalette.length]
  }
  static hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  } 

  static intToRGB(i) {
    let str = this.hashCode(i)
    var c = (str & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#"+"00000".substring(0, 6 - c.length) + c;
  }
}
