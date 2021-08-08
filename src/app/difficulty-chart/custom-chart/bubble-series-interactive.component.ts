import {
  Component,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, PlacementTypes, StyleTypes, ColorHelper } from '@swimlane/ngx-charts';
import { Circle, ChartDataExt, ChartDataItem, EventId, Entry } from '../ngx-charts.interfaces';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'g[ngx-charts-bubble-series-interactive]',
  template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g
          ngx-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClickBubble($event, circle)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="placementTypes.Top"
          [tooltipType]="styleTypes.tooltip"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate(250, style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class BubbleSeriesInteractiveComponent implements OnChanges {
  @Input() data: ChartDataExt;
  @Input() xScale;
  @Input() yScale;
  @Input() rScale;
  @Input() xScaleType;
  @Input() yScaleType;
  @Input() colors: ColorHelper;
  @Input() visibleValue;
  @Input() activeEntries: Entry[];
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate?: TemplateRef<any>;
  @Input() eventId?: EventId;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  areaPath: any;
  circles: Circle[];

  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.circles = this.getCircles();
  }

  getCircles(): Circle[] {
    if (typeof this.data.series === 'string') {
      return [];
    }
    return this.data.series
      .filter(item => item.x != null   && item.y != null)
      .map((d, i) => this.items2circles(d, i, this.data.eventId));
  }

  getTooltipText(circle: Circle): string {
    return `
      <span class="tooltip-label">
        <label>${circle.seriesName}</label><br />
        <label>${circle.tooltipLabel}</label>
      </span>
      <span class="tooltip-label">
        <label>${this.xAxisLabel}:</label> ${circle.x}<br />
        <label>${this.yAxisLabel}:</label> ${circle.y.toFixed(1)}<br />
        <label>TD:</label> ${circle.r.toFixed(2)}
      </span>
    `;
  }

  onClickBubble(value: string, circleObj: Circle): void {
    const event = circleObj.data;
    this.select.emit(event);
  }

  isActive(entry: Entry): boolean {
    if (!this.activeEntries) {
      return false;
    }
    const item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item !== undefined;
  }

  isVisible(circle: Circle): boolean {
    if (this.activeEntries.length > 0) {
      return this.isActive({ name: circle.seriesName });
    }
    return circle.opacity !== 0;
  }

  activateCircle(circle: Circle): void {
    circle.barVisible = true;
    this.activate.emit({ name: this.data.name });
  }

  deactivateCircle(circle: Circle): void {
    circle.barVisible = false;
    this.deactivate.emit({ name: this.data.name });
  }

  trackBy(index: number, circle: Circle): string {
    return `${circle.data.series} ${circle.data.name}`;
  }

  private items2circles(d: ChartDataItem, i: number, eventId: EventId): Circle {
    const seriesName = this.data.name;
    const y = d.y;
    const x = d.x;
    const r = d.r;

    const radius = this.rScale(r || 1);
    const tooltipLabel = formatLabel(d.name);

    const cx = this.xScaleType === 'linear' ? this.xScale(Number(x)) : this.xScale(x);
    const cy = this.yScaleType === 'linear' ? this.yScale(Number(y)) : this.yScale(y);

    const color = this.getColor(r, seriesName, eventId);
    const isActive = !this.activeEntries.length ? true : this.isActive({ name: seriesName });
    const opacity = this.getOpacity(isActive);

    const data: ChartDataExt = {
      eventId,
      series: seriesName,
      name: d.name,
      value: d.y,
      x: d.x,
      radius: d.r
    };

    return {
      data,
      x,
      y,
      r,
      classNames: [`circle-data-${i}`],
      value: y,
      label: x,
      cx,
      cy,
      radius,
      tooltipLabel,
      color,
      opacity,
      seriesName,
      isActive,
      transform: `translate(${cx},${cy})`
    };
  }

  private getOpacity(active: boolean) {
    if (this.eventId) {
      return 1;
    } else {
      return active ? 1 : 0.3;
    }
  }

  private getColor(r: number, name: string, eventId: EventId): string {
    if (this.eventId) {
      return this.eventId === eventId ? 'red' : 'gray';      
    } else if (this.colors.scaleType === 'linear') {
      return this.colors.getColor(r);
    } else {
      return this.colors.getColor(name);
    }
  }
}
