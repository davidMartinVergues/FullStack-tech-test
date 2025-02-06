import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { BasicAPIResponse, IdentificationTask } from '../../../shared/interfaces/shared.app.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTaskService {

  private identificationTaskSubject = new BehaviorSubject<IdentificationTask[]>([{
    "user_observation":{"gps_location":{"latitude":0,"longitude":0},"mosquito_img":''},
    "status":'0'
  }]);

  public identificationTask$ =  this.identificationTaskSubject.asObservable();

  constructor(private http:HttpClient,private snackbar:MatSnackBar) { }


  newIdentificationTask(formData: FormData): void {

    this.http.post<BasicAPIResponse>(`${environment.apiUrl}create-identification-task/`,formData).subscribe({
      next: (response) => {

        this.snackbar.open(response.msg,'Cerrar',{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: response.ok? 'custom-success-snackbar': 'custom-error-snackbar',
        });

        if(response.ok){
          this.getIdentificationTask()
        }

      }
    });

 }

 getIdentificationTask(): void {

    this.http.get<BasicAPIResponse>(`${environment.apiUrl}identification-tasks/`).subscribe({
      next:(response)=>{

        this.identificationTaskSubject.next(response.data!)

      }
    })

 }

 getIdentificationTaskByStatus(status:string): Observable<BasicAPIResponse> {

    return this.http.get<BasicAPIResponse>(`${environment.apiUrl}identification-tasks/status/${status}`)

 }

 toggleToComplete(id:number): Observable<BasicAPIResponse> {

    return this.http.get<BasicAPIResponse>(`${environment.apiUrl}identification-task/${id}/change-status/`)

 }

 deleteTask(id:number): Observable<BasicAPIResponse> {

    return this.http.delete<BasicAPIResponse>(`${environment.apiUrl}identification-task/${id}/delete/`)

 }

}
