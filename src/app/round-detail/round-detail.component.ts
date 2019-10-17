import { Component, Input } from '@angular/core';

import { CourseRatingsItem } from '../course-rating';

const MIN_RATING = 700;
const MAX_RATING = 1200;

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent {

  @Input() detail: CourseRatingsItem;

  rating: number;
  score: number;

  toLocaleDateString(time: string) {
    const date = new Date(time);
    return date.toLocaleDateString();
  }

  getSRCText(ssa: number) {
    if (!ssa) {
      return '';
    }
    if (ssa < 48) {
      return 'Category A (under 48)';
    }
    if (ssa < 54) {
      return 'Category 2A (48-53.9)';
    }
    if (ssa < 60) {
      return 'Category 3A (54-59.9)';
    }
    if (ssa < 66) {
      return 'Category 4A (60-65.9)';
    }
    return 'Category 5A (over 66)';
  }

  onRatingChanged() {
    if (typeof this.rating !== 'number') {
      this.score = NaN;
      return;
    }
    if (this.rating < MIN_RATING) {
      this.score = NaN;
      return;
    }
    if (this.rating > MAX_RATING) {
      this.score = NaN;
      return;
    }
    this.rating = Math.round(this.rating);
    this.score = this.rating2score(this.rating);
  }

  onScoreChanged() {
    if (typeof this.score !== 'number') {
      this.rating = NaN;
      return;
    }
    if (this.score < this.getMinScore()) {
      this.rating = NaN;
      return;
    }
    if (this.score > this.getMaxScore()) {
      this.rating = NaN;
      return;
    }
    this.score = Math.round(this.score);
    this.rating = this.score2rating(this.score);
  }

  private rating2score(rating: number) {
    let score = (rating - this.detail.offset) / this.detail.weight;
    score = Math.round(score * 10) / 10;
    return score;
  }

  private score2rating(score: number) {
    return Math.round(score * this.detail.weight + this.detail.offset);
  }

  private getMinScore() {
    return (this.detail.holes || 18) * 2;
  }

  private getMaxScore() {
    return (this.detail.holes || 18) * 6;
  }
}
