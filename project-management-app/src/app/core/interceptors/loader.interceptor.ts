import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { SpinnerService } from '../../modules/shared';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => this.spinnerService.showSpinner()),
      finalize(() => this.spinnerService.hideSpinner()),
    );
  }
}
