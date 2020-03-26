import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewComponent } from './video-view.component';

describe('VideoViewComponent', () => {
  let component: VideoViewComponent;
  let fixture: ComponentFixture<VideoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoViewComponent);
    component = fixture.componentInstance;
    component.video = {
      title: 'The 33rd Kyushu Open',
      subttl: 'Kyushu Open Digest',
      date: new Date('2019-10-13'),
      url: 'https://youtu.be/vToHZBT6Frc',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
