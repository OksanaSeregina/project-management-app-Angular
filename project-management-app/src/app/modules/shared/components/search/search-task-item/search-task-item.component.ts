import { Component, Input, OnInit } from '@angular/core';
import { TaskResp } from '../../../../../core';

@Component({
  selector: 'app-search-task-item',
  templateUrl: './search-task-item.component.html',
  styleUrls: ['./search-task-item.component.scss'],
})
export class SearchTaskItemComponent implements OnInit {
  @Input() public task: TaskResp;

  public username = ' ';

  ngOnInit(): void {
    if (this.task.users.length && this.task.users[0]) {
      this.username = this.task.users[0];
    }
  }
}
