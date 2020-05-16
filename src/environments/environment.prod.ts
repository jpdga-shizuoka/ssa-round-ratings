export interface Environment {
  production: boolean;
  projectPathName: string;
  title: string;
  language?: string;  // default local language
  localize?: {
    aliase2title?: string[];
  };
  MAP_API_KEY: string;
  map: {
    center: {
      lat: number;
      lng: number;
    },
    zoom: number;
  };
}

export const environment = {
  production: true,
  projectPathName: '/ssa-round-ratings',
  MAP_API_KEY: 'AIzaSyDfyR-mHrebjYkaU5LCF1HxDO_XWN4IjzA',
  map: {
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
