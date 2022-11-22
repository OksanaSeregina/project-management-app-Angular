import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  constructor(private router: Router) {}

  public navigateToMain(): void {
    this.router.navigate(['main']);
  }
}
