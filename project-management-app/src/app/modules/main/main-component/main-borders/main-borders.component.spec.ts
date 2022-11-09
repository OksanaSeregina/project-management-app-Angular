import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBordersComponent } from './main-borders.component';

describe('MainBordersComponent', () => {
  let component: MainBordersComponent;
  let fixture: ComponentFixture<MainBordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainBordersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainBordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
