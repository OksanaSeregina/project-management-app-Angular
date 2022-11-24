import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData, UserFacade } from '../../core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public user$: Observable<UserData | null>;

  constructor(private router: Router, private userFacade: UserFacade) {}

  public ngOnInit(): void {
    this.user$ = this.userFacade.user$;
  }

  public navigateToMain(): void {
    this.router.navigate(['main']);
  }
}
