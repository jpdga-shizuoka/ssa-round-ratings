import { Pipe, PipeTransform } from '@angular/core';
import { GeoPosition, LocationInfo } from './models';

@Pipe({
  name: 'geolink'
})
export class GeolinkPipe implements PipeTransform {
  transform(geoPosition?: GeoPosition | LocationInfo): string {
    if (!geoPosition) {
      return '';
    }
    const geolocation = ('geolocation' in geoPosition === true)
      ? (geoPosition as LocationInfo).geolocation
      : geoPosition as GeoPosition;
    return `${getUrlForGeolocation()}${geolocation[0]},${geolocation[1]}`;
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
