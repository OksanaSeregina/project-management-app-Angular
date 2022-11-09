import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBordersComponent } from './add-borders.component';

describe('AddBordersComponent', () => {
  let component: AddBordersComponent;
  let fixture: ComponentFixture<AddBordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBordersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
