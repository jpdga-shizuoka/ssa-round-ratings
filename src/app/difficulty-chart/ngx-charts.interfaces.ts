import { EventId } from '../models';

export { EventId };

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

export interface ChartDataExt extends ChartData {
  eventId?: EventId;
}

export interface BubbleData {
  bubble: ChartDataItem;
  series: ChartDataExt;
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
  data: ChartDataExt[];
}

export interface Circle {
  seriesName: string;
  tooltipLabel: string;
  x: number;
  y: number;
  r: number;
  data: ChartDataExt;
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
