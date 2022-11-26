import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CommonFacade } from '../../../../core';
import { ToggleFormComponent } from './toggle-form.component';

describe('ToggleFormComponent', () => {
  let component: ToggleFormComponent;
  let fixture: ComponentFixture<ToggleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ToggleFormComponent],
      providers: [
        {
          provide: CommonFacade,
          useValue: { isList$: of({}) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
