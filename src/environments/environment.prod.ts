// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface Environment {
  production: boolean;
  projectPathName: string;
  language?: string;  // default local language
  localize?: {
    aliase2title?: string[];
  };
  googlemaps: {
    apikey: string;
    center: {
      lat: number;
      lng: number;
    },
    zoom: number;
  };
}

export const environment: Environment = {
  production: true,
  projectPathName: '/ssa-round-ratings',
  googlemaps: {
    apikey: 'AIzaSyAdTyqg908nbRCLCGIhmTu6IF0RLA3mJpg',
    center: {
      lat: 36.306148,
      lng: 137.995148
    },
    zoom: 5,
  },
  language: 'ja',
  localize: {
    aliase2title: [
      'a', 'b',
      'if (a > 1960) {return a + "年 " + b;} return "第" + a + "回 " + b;'
    ],
  }
};
