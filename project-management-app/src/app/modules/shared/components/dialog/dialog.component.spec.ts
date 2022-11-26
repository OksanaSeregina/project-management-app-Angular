import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DialogComponent } from './dialog.component';

const TRRANSLATE_SERVICE_SPY = jasmine.createSpyObj<TranslateService>('translateService', ['instant', 'get']);
const TRANSLATE_SERVICE_MOCK = {
  currentLang: 'en',
  onLangChange: new EventEmitter<LangChangeEvent>(),
  instant: TRRANSLATE_SERVICE_SPY.instant,
  use: TRRANSLATE_SERVICE_SPY.get,
  get: TRRANSLATE_SERVICE_SPY.get.and.returnValue(of('')),
  onTranslationChange: new EventEmitter(),
  onDefaultLangChange: new EventEmitter(),
};

describe('BoardModalComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [DialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { action: '' },
        },
        {
          provide: MatDialogRef,
          useValue: { close: () => {} },
        },
        {
          provide: TranslateService,
          useValue: TRANSLATE_SERVICE_MOCK,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
