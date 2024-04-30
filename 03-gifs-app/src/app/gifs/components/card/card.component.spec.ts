import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsCardComponent } from './card.component';

describe('GifsCardComponent', () => {
  let component: GifsCardComponent;
  let fixture: ComponentFixture<GifsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GifsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
