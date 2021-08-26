import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import {
  getDomain,
  getScale,
  getScaleType,
  id,
  LegendOptions,
  LegendPosition,
  ViewDimensions,
  ColorHelper,
  BaseChartComponent,
  calculateViewDimensions,
  ScaleType
} from '@swimlane/ngx-charts';
import { ChartDataExt, EventId, Entry } from '../ngx-charts.interfaces';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-charts-bubble-chart-interactive',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [activeEntries]="activeEntries"
      [legendOptions]="legendOptions"
      [animations]="animations"
      (legendLabelClick)="onClickLabel($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)"
    >
      <svg:defs>
        <svg:clipPath [attr.id]="clipPathId">
          <svg:rect
            [attr.width]="dims?.width + 10"
            [attr.height]="dims?.height + 10"
            [attr.transform]="'translate(-5, -5)'"
          />
        </svg:clipPath>
      </svg:defs>
      <svg:g [attr.transform]="transform" class="bubble-chart chart">
        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          [showGridLines]="showGridLines"
          [dims]="dims"
          [xScale]="xScale"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          (dimensionsChanged)="updateXAxisHeight($event)"
        />
        <svg:g
          ngx-charts-y-axis
          *ngIf="yAxis"
          [showGridLines]="showGridLines"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          (dimensionsChanged)="updateYAxisWidth($event)"
        />
        <svg:rect
          class="bubble-chart-area"
          x="0"
          y="0"
          [attr.width]="dims?.width"
          [attr.height]="dims?.height"
          style="fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';"
          (mouseenter)="deactivateAll()"
        />
        <svg:g [attr.clip-path]="clipPath">
          <svg:g *ngFor="let series of data; trackBy: trackBy" [@animationState]="'active'">
            <svg:g
              ngx-charts-bubble-series-interactive
              [xScale]="xScale"
              [yScale]="yScale"
              [rScale]="rScale"
              [xScaleType]="xScaleType"
              [yScaleType]="yScaleType"
              [xAxisLabel]="xAxisLabel"
              [yAxisLabel]="yAxisLabel"
              [colors]="colors"
              [data]="series"
              [activeEntries]="activeEntries"
              [eventId]="eventId"
              [tooltipDisabled]="tooltipDisabled"
              [tooltipTemplate]="tooltipTemplate"
              (select)="onClickSeries($event, series)"
              (activate)="onActivate($event)"
              (deactivate)="onDeactivate($event)"
            />
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['./base-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(
          500,
          style({
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class BubbleChartInteractiveComponent extends BaseChartComponent {
  @Input() showGridLines: boolean = true;
  @Input() legend = false;
  @Input() legendTitle: string = 'Legend';
  @Input() xAxis: boolean = true;
  @Input() yAxis: boolean = true;
  @Input() showXAxisLabel: boolean = false;
  @Input() showYAxisLabel: boolean = false;
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() xAxisTicks?: any[];
  @Input() yAxisTicks?: any[];
  @Input() roundDomains: boolean = false;
  @Input() maxRadius = 10;
  @Input() minRadius = 3;
  @Input() autoScale: boolean = true;
  @Input() schemeType: ScaleType = ScaleType.Ordinal;
  @Input() legendPosition = LegendPosition.Right;
  @Input() tooltipDisabled: boolean = false;
  @Input() xScaleMin: any;
  @Input() xScaleMax: any;
  @Input() yScaleMin: any;
  @Input() yScaleMax: any;
  @Input() eventId?: EventId;

  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate?: TemplateRef<any>;

  dims: ViewDimensions = { width: 0, height: 0};
  colors?: ColorHelper;
  scaleType = 'linear';
  margin = [10, 20, 10, 20];
  bubblePadding = [0, 0, 0, 0];
  data?: ChartDataExt[];

  legendOptions?: LegendOptions;
  transform?: string;

  clipPath?: string;
  clipPathId?: string;

  seriesDomain: string[] = [];
  xDomain: number[] = [];
  yDomain: number[] = [];
  rDomain: number[] = [];

  xScaleType: ScaleType = ScaleType.Linear;
  yScaleType: ScaleType = ScaleType.Linear;

  yScale?: ScaleLinear<number, number, never>;
  xScale?: ScaleLinear<number, number, never>;
  rScale?: ScaleLinear<number, number, never>;

  xAxisHeight: number = 0;
  yAxisWidth: number = 0;

  activeEntries: Entry[] = [];

  update(): void {
    const results = this.results;
    super.update();
    this.results = results;
    this.data = this.results;

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.schemeType
    });

    this.seriesDomain = this.data?.length ? this.data.map(d => d.name) : this.seriesDomain;
    this.rDomain = this.getRDomain();
    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();

    this.transform = `translate(${this.dims.xOffset},${this.margin[0]})`;

    const colorDomain = this.schemeType === ScaleType.Ordinal ? this.seriesDomain : this.rDomain;
    this.colors = new ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);

    this.minRadius = Math.max(this.minRadius, 1);
    this.maxRadius = Math.max(this.maxRadius, 1);

    this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);

    this.bubblePadding = [0, 0, 0, 0];
    this.setScales();

    this.bubblePadding = this.getBubblePadding();
    this.setScales();

    this.legendOptions = this.getLegendOptions();

    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(#${this.clipPathId})`;
  }

  @HostListener('mouseleave')
  hideCircles(): void {
    this.deactivateAll();
  }

  onClickLabel(eventOnLegendSeriesLabelSelect: string) {
    const eventOnLegendLabelSelect = { name: eventOnLegendSeriesLabelSelect };
    this.legendLabelClick.emit(eventOnLegendLabelSelect);
  }

  onClickSeries(eventOnBubbleSeriesCircleSelect: ChartDataExt, seriesObj: ChartDataExt) {
    // bubbles up from the series circle item select event
    const bubbleObj = seriesObj.series.find(b => b.name === eventOnBubbleSeriesCircleSelect.name);
    const eventOnBubbleSeriesSelect = {
      bubble: bubbleObj,
      series: seriesObj
    };
    this.select.emit(eventOnBubbleSeriesSelect);
  }

  getBubblePadding() {
    let yMin = 0;
    let xMin = 0;
    let yMax = this.dims.height;
    let xMax = this.dims.width;

    if(!this.data || !this.rScale || !this.xScale || !this.yScale) {
      return [0, 0, 0, 0];
    }
    for (const s of this.data) {
      for (const d of s.series) {
        const r = this.rScale(d.r);
        const cx = this.xScaleType === ScaleType.Linear ? this.xScale(Number(d.x)) : this.xScale(d.x);
        const cy = this.yScaleType === ScaleType.Linear ? this.yScale(Number(d.y)) : this.yScale(d.y);
        xMin = Math.max(r - cx, xMin);
        yMin = Math.max(r - cy, yMin);
        yMax = Math.max(cy + r, yMax);
        xMax = Math.max(cx + r, xMax);
      }
    }

    xMax = Math.max(xMax - this.dims.width, 0);
    yMax = Math.max(yMax - this.dims.height, 0);

    return [yMin, xMax, yMax, xMin];
  }

  setScales() {
    if (this.dims == null) {
      return;
    }
    let width = this.dims.width;
    if (this.xScaleMin === undefined && this.xScaleMax === undefined) {
      width = width - this.bubblePadding[1];
    }
    let height = this.dims.height;
    if (this.yScaleMin === undefined && this.yScaleMax === undefined) {
      height = height - this.bubblePadding[2];
    }
    this.xScale = this.getXScale(this.xDomain, width);
    this.yScale = this.getYScale(this.yDomain, height);
  }

  getYScale(domain: number[], height: number): any {
    return getScale(domain, [height, this.bubblePadding[0]], this.yScaleType, this.roundDomains);
  }

  getXScale(domain: number[], width: number): any {
    return getScale(domain, [this.bubblePadding[3], width], this.xScaleType, this.roundDomains);
  }

  getRScale(domain: number[], range: number[]): any {
    const scale = scaleLinear().range(range).domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

  getLegendOptions(): LegendOptions {
    return this.schemeType === ScaleType.Ordinal ? {
        scaleType: this.schemeType,
        colors: this.colors,
        domain: this.seriesDomain ?? [],
        position: this.legendPosition,
        title: this.legendTitle
      } : {
        scaleType: this.schemeType,
        colors: this.colors?.scale,
        domain: this.rDomain ?? [],
        position: this.legendPosition,
        title: ''
      };
  }

  getXDomain(): number[] {
    const values: number[] = [];
    if (!this.results) {
      return values;
    }

    for (const results of this.results) {
      for (const d of results.series) {
        if (!values.includes(d.x)) {
          values.push(d.x);
        }
      }
    }

    this.xScaleType = getScaleType(values);
    return getDomain(values, this.xScaleType, this.autoScale, this.xScaleMin, this.xScaleMax);
  }

  getYDomain(): number[] {
    const values: number[] = [];
    if (!this.results) {
      return values;
    }

    for (const result of this.results) {
      for (const d of result.series) {
        if (!values.includes(d.y)) {
          values.push(d.y);
        }
      }
    }

    this.yScaleType = getScaleType(values);
    return getDomain(values, this.yScaleType, this.autoScale, this.yScaleMin, this.yScaleMax);
  }

  getRDomain(): number[] {
    let min = Infinity;
    let max = -Infinity;
    if (!this.results) {
      return [] as number[];
    }

    for (const results of this.results) {
      for (const d of results.series) {
        const value = Number(d.r) || 1;
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }

    return [min, max];
  }

  updateYAxisWidth(event: { width: number }): void {
    this.yAxisWidth = event.width;
    this.update();
  }

  updateXAxisHeight(event: { height: number }): void {
    this.xAxisHeight = event.height;
    this.update();
  }

  onActivate(item: Entry): void {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [item, ...this.activeEntries];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item: Entry): void {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  deactivateAll() {
    this.activeEntries = [...this.activeEntries];
    for (const entry of this.activeEntries) {
      this.deactivate.emit({ value: entry, entries: [] });
    }
    this.activeEntries = [];
  }

  trackBy(index: number, item: Entry): string {
    return `${item.name}`;
  }
}
