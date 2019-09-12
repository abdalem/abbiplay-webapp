import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTrendingComponent } from './media-trending.component';

describe('MediaTrendingComponent', () => {
  let component: MediaTrendingComponent;
  let fixture: ComponentFixture<MediaTrendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaTrendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
