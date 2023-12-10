import { Pipe, PipeTransform } from '@angular/core';
import { FieldViewModel } from '../data-model/field.model';
import { HectaresUtils } from '../../shared/utils/hectare.util';

@Pipe({
  name: 'fieldInfoModalSvg',
  standalone: true
})
export class FieldInfoModalSvgPipe implements PipeTransform {

  transform(field: FieldViewModel): string {
    const x = 132;
    const y = 80

    const svg =  `<svg width="132" height="104" viewBox="0 0 132 104" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${x}" height="${y}" rx="5" fill="black" fill-opacity="0.8"/>
    <path d="M67.5 104L54.9426 80H80.0574L67.5 104Z" fill="black" fill-opacity="0.8"/>
    <text
      x="${x / 2}"
      y="20"
      dominant-baseline="middle"
      text-anchor="middle"
      fill="white" 
      xml:space="preserve" 
      style="white-space: pre" font-family="Inter" font-size="16" font-weight="600" letter-spacing="0em">
      ${field.name}
    </text>
    <text 
      x="${x / 2}"
      y="40"
      dominant-baseline="middle"
      text-anchor="middle"
      fill="white" 
      xml:space="preserve" 
      style="white-space: pre" 
      font-family="Inter" 
      font-size="12" 
      font-weight="300" 
      letter-spacing="0em">
      ${field.address.city}
    </text>
    <text 
      x="${x / 2}"
      y="60"
      dominant-baseline="middle"
      text-anchor="middle"
      fill="white" 
      xml:space="preserve" 
      style="white-space: pre" 
      font-family="Inter" 
      font-size="14" 
      letter-spacing="0em">
      ${HectaresUtils.ConvertToHectares(field.area).toFixed(2)} ha
    </text>
    </svg>
    `;

    return this.encodeSVG(svg);
  }

  private encodeSVG(rawSvgString: string): string {
    const symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g;

    // Use single quotes instead of double to avoid URI encoding
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
