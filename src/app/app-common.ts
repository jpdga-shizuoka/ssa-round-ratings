export const ICONS: {
  [string: string]: string
} = {
  video: 'ondemand_video',
  photo: 'camera_alt',
  website: 'public'
};

export interface MiscInfo {
  icon: string;
  title: string;
  url: string;
  date?: Date;
}
