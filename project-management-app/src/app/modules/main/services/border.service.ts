import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BorderService {
  private borderSubject = new BehaviorSubject<boolean>(true);

  initborder$: Observable<boolean> = this.borderSubject.asObservable();

  constructor() {}

  translateByText(order: boolean) {
    this.borderSubject.next(order);
  }
}
