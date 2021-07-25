import { RoundInfo } from '../remote.service';

export interface BuubleDataItem {
  name: string;
  x: number;
  y: number;
  r: number;
}

export interface BubbleData {
  name: string;
  series: BuubleDataItem[];
}

export interface BubbleDataResult {
  hla: {
    min: number;
    max: number;
  },
  ssa: {
    min: number;
    max: number;
  },
  data: BubbleData[];
}

function floor(value: number, offset: number) {
  return Math.floor(value / offset) * offset;
}

function ceil(value: number, offset: number) {
  return Math.ceil(value / offset) * offset;
}

function rounds2data(rounds: RoundInfo[]): BubbleData[] {
  return rounds.map(round => {
    return {
      name: round.eventTitle,
      series: [
        {
          name: round.round,
          x: round.hla!,
          y: round.ssa!,
          r: round.difficulty!
        }
      ]
    };
  });
}

export function rounds2result(rounds: RoundInfo[]): BubbleDataResult {
  const hla = {
    min: Number.MAX_VALUE,
    max: Number.MIN_VALUE
  };
  const ssa = {
    min: Number.MAX_VALUE,
    max: Number.MIN_VALUE
  };
  const data = rounds2data(rounds);
  data.forEach(element => {
    hla.min = Math.min(hla.min, element.series[0].x);
    hla.max = Math.max(hla.max, element.series[0].x);
    ssa.min = Math.min(ssa.min, element.series[0].y);
    ssa.max = Math.max(ssa.max, element.series[0].y);
  });
  return {
    hla: {
      min: floor(hla.min, 10),
      max: ceil(hla.max, 10)
    },
    ssa: {
      min: floor(ssa.min, 5),
      max: ceil(ssa.max, 5)
    },
    data
  };
}
