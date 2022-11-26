import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CommonFacade } from '../../../../core';
import { SortFormComponent } from './sort-form.component';

describe('SearchFormComponent', () => {
  let component: SortFormComponent;
  let fixture: ComponentFixture<SortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [SortFormComponent],
      providers: [
        {
          provide: CommonFacade,
          useValue: { sortBy$: of({}) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
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
