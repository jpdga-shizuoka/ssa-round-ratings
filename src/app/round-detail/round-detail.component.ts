import { Component, Input, Output, OnInit } from '@angular/core';
import {
  getEventTitle, getPdgaResult, getJpdgaResult, getJpdgaInfo, getJpdgaReport, getJpdgaPhoto, getLiveScore
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
  pdgaInfo: MiscInfo[] = [];
  jpdgaInfo: MiscInfo[] = [];
  miscInfo: MiscInfo[] = [];
  videoInfo: MiscInfo[] = [];

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

  get equation(): string | undefined {
    if (!this.round.weight || !this.round.offset) {
      return undefined;
    }
    return `Rating = ${this.round.weight.toFixed(1)} * Score + ${this.round.offset.toFixed(0)}`;
  }

  get title() {
    return getEventTitle(this.event?.title);
  }

  get isPdga(): boolean {
    return (this.event?.status !== 'CANCELED') && (this.pdgaInfo.length > 0);
  }

  private getLocation(id: LocationId) {
    this.remote.getLocation(id).subscribe(
      location => this.location = location,
      err => console.log(err),
      () => {
        this.makePdgaInfo();
        this.makeJpdgaInfo();
        this.makeMiscInfo();
        this.makeVideoInfo();
      }
    );
  }

  private makePdgaInfo() {
    if (this.event.pdga?.eventId) {
      this.pdgaInfo.push({
        icon: 'public',
        title: 'Results',
        url: getPdgaResult(this.event.pdga.eventId)
      });
    }
    if (this.event.pdga?.liveScore) {
      this.pdgaInfo.push({
        icon: 'public',
        title: 'Score Cards',
        url: getLiveScore(this.event.pdga.liveScore)
      });
    }
  }

  private makeJpdgaInfo() {
    if (this.event.jpdga?.eventId) {
      this.jpdgaInfo.push({
        icon: 'public',
        title: 'Results',
        url: getJpdgaResult(this.event.jpdga.eventId)
      });
      this.jpdgaInfo.push({
        icon: 'public',
        title: 'Papers',
        url: getJpdgaInfo(this.event.jpdga.eventId)
      });
    }
    if (this.event.jpdga?.topicId) {
      this.jpdgaInfo.push({
        icon: 'public',
        title: 'Report',
        url: getJpdgaReport(this.event.jpdga.topicId)
      });
    }
    if (this.event.jpdga?.photoId) {
      this.jpdgaInfo.push({
        icon: 'camera_alt',
        title: 'Photos',
        url: getJpdgaPhoto(this.event.jpdga.photoId)
      });
    }
  }

  private makeMiscInfo() {
    if (this.event.urls) {
      for (const urlInfo of this.event.urls) {
        if (urlInfo.type === 'video') {
          continue;
        }
        this.miscInfo.push({
          icon: ICONS[urlInfo.type],
          title: urlInfo.title,
          url: urlInfo.url
        });
      }
    }
  }

  private makeVideoInfo() {
    if (this.event.urls) {
      for (const urlInfo of this.event.urls) {
        if (urlInfo.type !== 'video') {
          continue;
        }
        this.videoInfo.push({
          icon: ICONS[urlInfo.type],
          title: urlInfo.title,
          url: urlInfo.url
        });
      }
    }
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
