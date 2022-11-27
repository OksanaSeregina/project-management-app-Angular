import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService, StorageService, TaskResp, TasksFacade } from '../../../../core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public isSearchResult = false;
  public tasks: TaskResp[] = [];
  public searchReq = '';

  constructor(
    private storageService: StorageService,
    private searchService: SearchService,
    private tasksFacade: TasksFacade,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.searchReq = <string>this.storageService.get('searchTask');
    this.subscription = this.tasksFacade.tasks$.subscribe((state) => {
      const allTasks = state.tasks || [];
      this.tasks = this.searchService.searchByTasks(this.searchReq, allTasks);
    });

    if (this.tasks.length) {
      this.isSearchResult = true;
    }
  }

  public ngOnDestroy(): void {
    this.storageService.remove('searchTask');
    this.isSearchResult = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public navigateToMain(): void {
    this.router.navigate(['main']);
  }
}
