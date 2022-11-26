import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../../modules/shared';
import { SimpleListComponent } from './simple-list.component';

describe('SimpleListComponent', () => {
  let component: SimpleListComponent;
  let fixture: ComponentFixture<SimpleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SimpleListComponent],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            instant: () => {},
            onLangChange: { subscribe: () => {} },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleListComponent);
    component = fixture.componentInstance;
    component.value = { _id: '', title: '', owner: '', users: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
