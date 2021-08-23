import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { getEventTitle, getLayout, makePdgaInfo, makeJpdgaInfo, makeMiscInfo, makeVideoInfo } from '../libs';
import { RemoteService, RoundInfo, EventInfo, LocationInfo, LocationId } from '../remote.service';
import { MiscInfo } from '../app-common';

const MIN_RATING = 700;
const MAX_RATING = 1200;

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent implements OnInit {
  @Input() round!: RoundInfo;
  @Input() showHistory = true;

  rating?: number;
  score?: number;

  private event?: EventInfo;
  location$?: Observable<LocationInfo>;
  pdgaInfo: MiscInfo[] = [];
  jpdgaInfo: MiscInfo[] = [];
  miscInfo: MiscInfo[] = [];
  videoInfo: MiscInfo[] = [];

  constructor(private readonly remote: RemoteService) { }

  ngOnInit(): void {
    if (!this.round) {
      throw new Error('[round] is required');
    }
    this.remote.getEvent(this.round.event, 'past')
      .pipe(first())
      .subscribe(event => {
        this.event = event;
        this.location$ = this.remote.getLocation(event.location);
        this.pdgaInfo = makePdgaInfo(event);
        this.jpdgaInfo = makeJpdgaInfo(event);
        this.miscInfo = makeMiscInfo(event);
        this.videoInfo = makeVideoInfo(event);
      });
  }

  get roundStatus(): string {
    return `${this.round.holes} holes @ ${this.round.round}`;
  }

  get totalPlayers(): number {
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

  get title(): string {
    return getEventTitle(this.event?.title);
  }

  get isPdga(): boolean {
    return (this.event?.status !== 'CANCELED') && (this.pdgaInfo.length > 0);
  }

  get layout(): string | undefined {
    return getLayout(this.event?.layout);
  }

  onRatingChanged(): void {
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

  onScoreChanged(): void {
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
    if (!this.round?.offset || !this.round?.weight) {
      return NaN;
    }
    let score = (rating - this.round.offset) / this.round.weight;
    score = Math.round(score * 10) / 10;
    return score;
  }

  private score2rating(score: number) {
    if (!this.round?.offset || !this.round?.weight) {
      return NaN;
    }
    return Math.round(score * this.round.weight + this.round.offset);
  }

  private getMinScore() {
    return (this.round.holes || 18) * 2;
  }

  private getMaxScore() {
    return (this.round.holes || 18) * 6;
  }
}
