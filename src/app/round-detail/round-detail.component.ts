import { Component, Input } from '@angular/core';

import { CommonService, RoundInfo } from '../common.service';

const MIN_RATING = 700;
const MAX_RATING = 1200;

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent {

  @Input() round: RoundInfo;

  rating: number;
  score: number;

  constructor(private cs: CommonService) {
  }

  getDate(round: RoundInfo): string {
    if (!round || !round.date) {
      return '';
    }
    const date = new Date(round.date);
    return date.toLocaleDateString();
  }

  getLocation(round: RoundInfo): string {
    return this.cs.getLocationNameFromEvent(round.event);
  }

  getGeolocation(round: RoundInfo): string {
    return this.cs.getGeolocationFromEvent(round.event);
  }

  getPrefecture(round: RoundInfo): string {
    return this.cs.getPrefectureFromEvent(round.event);
  }

  getJpdgaInfo(round: RoundInfo): string | undefined {
    return this.cs.getJpdgaInfo(round.event);
  }

  getJpdgaResult(round: RoundInfo): string | undefined {
    return this.cs.getJpdgaResult(round.event);
  }

  getPdgaResult(round: RoundInfo): string | undefined {
    return this.cs.getPdgaResult(round.event);
  }

  getEquation(round: RoundInfo): string {
    return `Rating = ${round.weight.toFixed(1)} * Score + ${round.offset.toFixed(0)}`;
  }

  getRoundStatus(round: RoundInfo): string {
    return `${round.holes} holes @ ${round.round}`;
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
    let score = (rating - this.round.offset) / this.round.weight;
    score = Math.round(score * 10) / 10;
    return score;
  }

  private score2rating(score: number) {
    return Math.round(score * this.round.weight + this.round.offset);
  }

  private getMinScore() {
    return (this.round.holes || 18) * 2;
  }

  private getMaxScore() {
    return (this.round.holes || 18) * 6;
  }
}
