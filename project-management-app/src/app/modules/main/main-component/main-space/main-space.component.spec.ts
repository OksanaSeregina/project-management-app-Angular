import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSpaceComponent } from './main-space.component';

describe('MainSpaceComponent', () => {
  let component: MainSpaceComponent;
  let fixture: ComponentFixture<MainSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSpaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
