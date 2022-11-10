import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Border } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class BorderService {
  private borderSubject = new BehaviorSubject<Border[]>([]);

  initborder$: Observable<Border[]> = this.borderSubject.asObservable();

  constructor() {}

  translateByText(order: Border) {
    // this.borderSubject.next(order);
  }
}
