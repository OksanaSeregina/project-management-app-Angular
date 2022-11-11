import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BorderAddService {
  private borderSubject = new BehaviorSubject<boolean>(false);

  initborder$: Observable<boolean> = this.borderSubject.asObservable();

  addBorder(order: boolean): void {
    this.borderSubject.next(order);
  }
}
