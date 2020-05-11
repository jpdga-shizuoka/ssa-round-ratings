import { Pipe, PipeTransform } from '@angular/core';
import { GeoPosition } from './models';

@Pipe({
  name: 'geolink'
})
export class GeolinkPipe implements PipeTransform {
  transform(value: GeoPosition): string {
    if (!value) {
      return '';
    }
    return getUrlForGeolocation() + `${location[0]},${location[1]}`;
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
