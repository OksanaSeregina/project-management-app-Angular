import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { publishReplay, refCount, debounceTime, takeUntil, tap } from 'rxjs/operators';

@Injectable()
export class SpinnerService implements OnDestroy {
  private destroySubj: Subject<boolean> = new Subject();
  private visibleSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isVisible$: Observable<boolean>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isVisible$ = this.visibleSubj.asObservable().pipe(
      tap((isVisible) => {
        if (isVisible) {
          this.document.body.classList.add('no-scroll');
        } else {
          this.document.body.classList.remove('no-scroll');
        }
      }),
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
