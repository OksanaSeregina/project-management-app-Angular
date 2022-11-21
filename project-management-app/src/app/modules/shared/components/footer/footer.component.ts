import { Component } from '@angular/core';
import { CARD_TEAM } from '../../../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public cardTeam = CARD_TEAM;
}
