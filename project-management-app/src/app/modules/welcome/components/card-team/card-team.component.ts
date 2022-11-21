import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CARD_TEAM } from '../../../../constants';

@Component({
  selector: 'app-card-team',
  templateUrl: './card-team.component.html',
  styleUrls: ['./card-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTeamComponent {
  public cardTeam = CARD_TEAM;
}
