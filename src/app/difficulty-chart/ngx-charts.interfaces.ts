export interface ChartDataItem {
  name: string;
  x: number;
  y: number;
  r: number;
}

export interface ChartData {
  name: string;
  series: ChartDataItem[] | string;
  value?: number;
  x?: number;
  radius?: number;
}

export interface ChartDataResult {
  hla: {
    min: number;
    max: number;
  },
  ssa: {
    min: number;
    max: number;
  },
  data: ChartData[];
}

export interface Circle {
  seriesName: string;
  tooltipLabel: string;
  x: number;
  y: number;
  r: number;
  data: ChartData;
  opacity: number;
  barVisible?: boolean;
  classNames: string[];

  value: number;
  label: number;
  cx: number;
  cy: number;
  radius: number;
  color: string;
  isActive: boolean;
  transform: string;
}
