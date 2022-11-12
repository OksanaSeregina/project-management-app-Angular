import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translateSubject = new BehaviorSubject<boolean>(true);

  initTranslate$: Observable<boolean> = this.translateSubject.asObservable();

  constructor() {}

  translateByText(order: boolean) {
    this.translateSubject.next(order);
  }
}
