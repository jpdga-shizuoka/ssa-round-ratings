import { Component, Input, Output, OnInit } from '@angular/core';
import {
  getEventTitle, getPdgaResult, getJpdgaResult, getJpdgaInfo, getJpdgaReport, getJpdgaPhoto
} from '../app-libs';
import { RemoteService, RoundInfo, EventInfo, LocationInfo, LocationId } from '../remote.service';
import { MiscInfo, ICONS } from '../app-common';

const MIN_RATING = 700;
const MAX_RATING = 1200;

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent implements OnInit {

  @Input() round: RoundInfo;
  @Input() showHistory = true;

  rating: number;
  score: number;

  private event: EventInfo;
  location?: LocationInfo;
  miscInfo: MiscInfo[];

  constructor(private readonly remote: RemoteService) { }

  ngOnInit() {
    this.remote.getEvent(this.round.event, 'past')
    .subscribe(
      event => this.event = event,
      err => console.log(err),
      () => this.getLocation(this.event.location)
    );
  }

  get roundStatus(): string {
    return `${this.round.holes} holes @ ${this.round.round}`;
  }

  get totalPlayers() {
    if (this.event?.players) {
      return this.event.players.pro
      + this.event.players.ama
      + this.event.players.misc;
    }
    return 0;
  }

  get src() {
    const ssa = this.round.ssa;
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

  get equation(): string | undefined {
    if (!this.round.weight || !this.round.offset) {
      return undefined;
    }
    return `Rating = ${this.round.weight.toFixed(1)} * Score + ${this.round.offset.toFixed(0)}`;
  }

  get title() {
    return getEventTitle(this.event?.title);
  }

  private getLocation(id: LocationId) {
    this.remote.getLocation(id).subscribe(
      location => this.location = location,
      err => console.log(err),
      () => this.makeMiscInfo()
    );
  }

  private makeMiscInfo() {
    const info: MiscInfo[] = [];
    const event = this.event;

    if (event.pdga && event.pdga.eventId) {
      info.push({
        icon: 'public',
        title: 'Results 🇺🇸',
        url: getPdgaResult(event.pdga.eventId)
      });
    }
    if (event.jpdga) {
      if (event.jpdga.eventId) {
        info.push({
          icon: 'public',
          title: 'Results 🇯🇵',
          url: getJpdgaResult(event.jpdga.eventId)
        });
        info.push({
          icon: 'public',
          title: 'Papers 🇯🇵',
          url: getJpdgaInfo(event.jpdga.eventId)
        });
      }
      if (event.jpdga.topicId) {
        info.push({
          icon: 'public',
          title: 'Report 🇯🇵',
          url: getJpdgaReport(event.jpdga.topicId)
        });
      }
      if (event.jpdga.photoId) {
        info.push({
          icon: 'camera_alt',
          title: 'Photos',
          url: getJpdgaPhoto(event.jpdga.photoId)
        });
      }
    }
    if (event.urls) {
      for (const urlInfo of event.urls) {
        info.push({
          icon: ICONS[urlInfo.type],
          title: urlInfo.title,
          url: urlInfo.url
        });
      }
    }
    this.miscInfo = info;
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
