import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { BoardFacade, CommonFacade, NotificationService } from '../../core';
import { SharedModule } from '../shared';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [MainComponent],
      providers: [
        {
          provide: BoardFacade,
          useValue: { boards$: of({}), loadBoards: () => {} },
        },
        {
          provide: CommonFacade,
          useValue: {
            searchValue$: of({}),
            isList$: of({}),
            loadSortBy: () => {},
            loadList: () => {},
            updateIsList: () => {},
            updateSearchValue: () => {},
            updateSortBy: () => {},
          },
        },
        {
          provide: NotificationService,
          useValue: { confirm: () => {} },
        },
        {
          provide: TranslateService,
          useValue: { instant: () => {} },
        },
        {
          provide: MatDialog,
          useValue: { open: () => {} },
        },
        {
          provide: Router,
          useValue: { navigate: () => {} },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
