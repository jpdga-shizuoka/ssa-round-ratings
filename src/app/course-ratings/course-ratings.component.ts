import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CommonService } from '../common.service';
import { CourseRatingsItem } from '../course-rating';
import CourseRatingsData from '../../assets/course-rating-data.json';

const BREAKPOINT = 600;

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-course-ratings',
  templateUrl: './course-ratings.component.html',
  styleUrls: ['./course-ratings.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CourseRatingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<CourseRatingsItem>;
  expandedElement: CourseRatingsItem | null;
  rssa = 0;

  constructor(public commonService: CommonService) {
    // Assign the data to the data source for the table to render
    for (const round of CourseRatingsData) {
      round['weight'] = calcWeight(round.ratings.player1, round.ratings.player2);
      round['offset'] = calcOffset(round);
      round['ssa'] = calcSsa(round);
      round['rssa'] = this.calcRssa(round);
      round['category'] = calcCategory(round['ssa']);
    }
    CourseRatingsData.sort((a, b) => {
      const t1 = new Date(a.date);
      const t2 = new Date(b.date);
      return t2.getTime() - t1.getTime();
    });
    this.dataSource = new MatTableDataSource(CourseRatingsData);
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: CourseRatingsItem, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split('&');
      const columns = [ data.continent,
                        data.country,
                        data.event,
                        data.round,
                        data.date,
                        data.hla,
                        data.holes,
                        data.ssa,
                        data.category,
      ];

      filterArray.forEach(filter => {
        const customFilter = [];
        columns.forEach(column => {
          if (column != null) {
            const scolumn = typeof column === 'number' ? column.toString() : column;
            customFilter.push(scolumn.toLowerCase().includes(filter));
          }
        });
        matchFilter.push(customFilter.some(Boolean)); // OR
      });
      return matchFilter.every(Boolean); // AND
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'event':
          return this.commonService.getEventTitle(item.event);
        case 'year':
          return new Date(item.date);
        default:
          // default sorting
          return item[property];
      }
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEventAliase(name: string): string {
    return this.commonService.getEventAliase(name);
  }

  getDisplayedColumns() {
    return window.innerWidth >= BREAKPOINT
      ? ['year', 'event', 'round', 'hla', 'ssa']
      : ['event', 'hla', 'ssa'];
  }

  getYear(time: string) {
    const date = new Date(time);
    return date.getFullYear();
  }

  private calcRssa(round: CourseRatingsItem) {
    if (this.rssa === 1) {
      return calcRssa1(round);
    } else {
      return calcRssa2(round);
    }
  }
}

function calcWeight(player1: { score: number, rating: number }, player2: { score: number, rating: number }) {
  return (player1.rating - player2.rating) / (player1.score - player2.score);
}

function calcOffset(round: CourseRatingsItem) {
  return round.ratings.player1.rating - round['weight'] * round.ratings.player1.score;
}

function calcSsa(round: CourseRatingsItem) {
  const holes = round.holes || 18;
  const regulation = holes / 18;
  return (1000 - round['offset']) / round['weight'] / regulation;
}

function calcCategory(ssa: number) {
  if (ssa < 48) {
    return 'A';
  } else if (ssa < 54) {
    return '2A';
  } else if (ssa < 60) {
    return '3A';
  } else if (ssa < 66) {
    return '4A';
  } else {
    return '5A';
  }
}

function calcRssa1(round: CourseRatingsItem) {
  return round.hla ? round['ssa'] / round.hla * 10 : 0;
}

function calcRssa2(round: CourseRatingsItem) {
  return round.hla ? round['ssa'] / Math.log10(round.hla) * 2 : 0;
}
