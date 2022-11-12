import { Component, OnInit } from '@angular/core';
import { CARD_TEAM } from '../../../shared';

@Component({
  selector: 'app-card-team',
  templateUrl: './card-team.component.html',
  styleUrls: ['./card-team.component.scss'],
})
export class CardTeamComponent implements OnInit {
  public cardTeam = CARD_TEAM;

  constructor() {}

  ngOnInit(): void {}
}
