import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HEADER_BUTTONS } from '../../../../constants';
import { CommonFacade, UserFacade } from '../../../../core';
import { TranslateNames } from '../../../../enums';
import { BoardModalComponent } from '../board-modal';
import { IHeaderButton } from './models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private commonFacade: CommonFacade,
    private router: Router,
    private dialog: MatDialog,
    private userFacade: UserFacade,
  ) {}

  public translateNames = TranslateNames;
  public language$: Observable<TranslateNames>;
  public buttons$: Observable<IHeaderButton[]>;

  public ngOnInit(): void {
    this.language$ = this.commonFacade.language$;
    this.buttons$ = this.userFacade.user$.pipe(
      map((user) => HEADER_BUTTONS.filter((button) => button.isVisibleForUser === !!user)),
    );
  }

  public languageChange(language: MatButtonToggleChange): void {
    this.commonFacade.updateLanguage(language.value);
  }

  public navigateToRoute(value: IHeaderButton): void {
    const route = value.route;
    if (route) {
      this.router.navigate([route]);
    } else {
      switch (value.value) {
        case 'newboard':
          this.router.navigate(['main']);
          this.dialog.open(BoardModalComponent);
          break;
        case 'logout':
          this.userFacade.logout();
      }
    }
  }
}
