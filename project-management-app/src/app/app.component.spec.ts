import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CommonFacade, SpinnerService, UserFacade } from './core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [AppComponent],
      providers: [
        {
          provide: CommonFacade,
          useValue: { language$: {}, loadLanguage: () => {} },
        },
        {
          provide: UserFacade,
          useValue: { loadUser: () => {} },
        },
        {
          provide: SpinnerService,
          useValue: { isVisible$: of({}) },
        },
        {
          provide: TranslateService,
          useValue: { addLangs: () => {}, use: () => {} },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
