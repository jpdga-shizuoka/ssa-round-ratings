import { Pipe, PipeTransform } from '@angular/core';
import { GeoPosition } from './models';

@Pipe({
  name: 'geolink'
})
export class GeolinkPipe implements PipeTransform {
  transform(ll?: GeoPosition): string {
    if (!ll) {
      return '';
    }
    return `${getUrlForGeolocation()}${ll[0]},${ll[1]}`;
  }
}

function getUrlForGeolocation(): string {
  return isAppleDevice()
    ? 'http://maps.apple.com/?ll='
    : 'https://maps.google.com/?q=';
}

function isAppleDevice(): boolean {
  return /iPhone|iPad|Macintosh/.test(window.navigator.userAgent);
}
