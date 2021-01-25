import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

deciPipe: DecimalPipe;

unidades = [
  'Bytes',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB'
];

  constructor( @Inject(LOCALE_ID) localId ) {
    this.deciPipe = new DecimalPipe( localId );
  }

  transform(bytes: number = 0, precision: number = 2): string {
    if ( isNaN( parseFloat( String(bytes) ) ) || !isFinite( bytes ) ) {
      return '?';
    }
    let unit = 0;

    while (bytes >= 1024) {
        bytes /= 1024;
        unit++;
    }
    if( unit === 0 ) {
      precision = 0;
    }
    return bytes <= 1024 ? this.deciPipe.transform( bytes, '1.1-' + precision ) + ' ' + this.unidades[ unit ] : bytes + ' ' + this.unidades[unit];
  }

}
