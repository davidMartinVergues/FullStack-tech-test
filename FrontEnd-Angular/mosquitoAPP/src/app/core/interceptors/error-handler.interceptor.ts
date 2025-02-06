import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorNotificationService } from '../services/error-notification.service';
import { inject } from '@angular/core';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  const errorNotificationService = inject(ErrorNotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = "";

      if (error.error instanceof ErrorEvent){
        errorMessage = `Error: ${error.message}`

      }else{

        errorMessage = `Error code: ${error.status}, message:  ${error.message}`
      }
      errorNotificationService.showError(errorMessage);

      return throwError(()=>errorMessage);

    })
  );;
};
