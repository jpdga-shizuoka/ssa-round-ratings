import { RoundInfo } from '../remote.service';
import { LocalizeService } from '../localize.service';
import { ChartDataExt, ChartDataResult } from './ngx-charts.interfaces';
import { EventId } from '../models';

function floor(value: number, offset: number) {
  return Math.floor(value / offset) * offset;
}

function ceil(value: number, offset: number) {
  return Math.ceil(value / offset) * offset;
}

function rounds2data(rounds: RoundInfo[], localize: LocalizeService): ChartDataExt[] {
  return rounds.map(round => {
    return {
      name: localize.transform(round.eventTitle),
      series: [
        {
          name: round.round,
          x: round.hla!,
          y: round.ssa!,
          r: round.difficulty!
        }
      ],
      eventId: round.event
    };
  });
}

export function rounds2result(rounds: RoundInfo[], localize: LocalizeService): ChartDataResult {
  const hla = {
    min: Number.MAX_VALUE,
    max: Number.MIN_VALUE
  };
  const ssa = {
    min: Number.MAX_VALUE,
    max: Number.MIN_VALUE
  };
  const data = rounds2data(rounds, localize);
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

//
// 特定のeventIdを持つ要素を配列の最後に移動させる
//
export function reorder(data: ChartDataExt[], id?: EventId): ChartDataExt[] {
  if (!id) {
    return data;
  }
  let founds: ChartDataExt[] = [];
  const r = data.filter(item => {
    if (item.eventId === id) {
      founds.push(item);
      return false;
    } else {
      return true;
    }
  });
  if (!founds.length) {
    return r;
  }
  return r.concat(founds);
}