import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CommonFacade } from '../../../../core';
import { TranslateNames } from '../../../../enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(public translate: TranslateService, private commonFacade: CommonFacade) {}

  public translateNames = TranslateNames;
  public language$: Observable<TranslateNames>;

  public ngOnInit(): void {
    this.language$ = this.commonFacade.language$;
  }

  public languageChange(language: MatButtonToggleChange): void {
    this.commonFacade.updateLanguage(language.value);
  }
}
