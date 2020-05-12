export interface Environment {
  production: boolean;
  projectPathName: string;
  title: string;
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
  }
};
