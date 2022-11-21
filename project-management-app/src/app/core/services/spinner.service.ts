import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, publishReplay, refCount, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService implements OnDestroy {
  private destroySubj: Subject<boolean> = new Subject();
  private visibleSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isVisible$: Observable<boolean>;

  constructor() {
    this.isVisible$ = this.visibleSubj.asObservable().pipe(
      // debounceTime using to fix error ExpressionChangedAfterItHasBeenCheckedError
      debounceTime(100),
      takeUntil(this.destroySubj),
      publishReplay(1),
      refCount(),
    );
  }

  public ngOnDestroy(): void {
    this.destroySubj.next(true);
    this.destroySubj.unsubscribe();
  }

  public hideSpinner(): void {
    this.visibleSubj.next(false);
  }

  public showSpinner(): void {
    this.visibleSubj.next(true);
  }
}
