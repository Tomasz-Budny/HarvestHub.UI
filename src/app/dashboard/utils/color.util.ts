export class ColorUtil {
  static hexColors: string[] = [
    "#324C08",
    "#E6E5A3",
    "#856035",
    "#6E7444",
    "#DAC92E",
    "#647D3B",
  ];

  static getRandomColorExcept(excludedHexColor: string) {
    const filteredHexColors = this.hexColors.filter(hexColor => hexColor !== excludedHexColor)

    return filteredHexColors[Math.floor(Math.random() * filteredHexColors.length)];
  }
}