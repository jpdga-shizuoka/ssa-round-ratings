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
  production: false,
  projectPathName: '',
  googlemaps: {
    apikey: 'xxxx',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
