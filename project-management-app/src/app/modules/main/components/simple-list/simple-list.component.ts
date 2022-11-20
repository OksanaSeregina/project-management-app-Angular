import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { INavigateButton } from '../../../shared';
import { IBoard } from '../../../board';

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  buttons: INavigateButton[] = [
    {
      icon: 'edit',
      value: this.translate.instant('board.edit_board'),
      isVisibleForUser: true,
      route: 'edit',
    },
    {
      icon: 'delete',
      value: this.translate.instant('board.delete_board'),
      isVisibleForUser: true,
      route: 'delete',
    },
  ];

  @Input() public value: IBoard;
  @Input() public isList: boolean;

  @Output() public delete = new EventEmitter<IBoard>();
  @Output() public edit = new EventEmitter<IBoard>();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const [editBtn, deleteBtn] = this.buttons;
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.buttons = [
        { ...editBtn, value: this.translate.instant('board.edit_board') },
        { ...deleteBtn, value: this.translate.instant('board.delete_board') },
      ];
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public navigate(button: INavigateButton): void {
    switch (button.route) {
      case 'edit':
        this.edit.emit(this.value);
        break;
      case 'delete':
        this.delete.emit(this.value);
        break;
    }
  }
}
