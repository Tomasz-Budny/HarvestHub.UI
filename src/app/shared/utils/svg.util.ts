export class SvgUtil {
  public static encodeSVG(rawSvgString: string): string {
    const symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g;

    rawSvgString = rawSvgString
      .replace(/'/g, '"')
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ');

    return (
      'data:image/svg+xml;utf-8,' +
      rawSvgString.replace(symbols, encodeURIComponent)
    );
  }
}