import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFormComponent } from './sort-form.component';

describe('SearchFormComponent', () => {
  let component: SortFormComponent;
  let fixture: ComponentFixture<SortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
