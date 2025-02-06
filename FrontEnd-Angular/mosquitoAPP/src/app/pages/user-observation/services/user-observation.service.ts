import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {BasicAPIResponse} from '../../../shared/interfaces/shared.app.interfaces'

@Injectable({
  providedIn: 'root'
})
export class UserObservationService {

  constructor(private http:HttpClient) { }


  newUserObservation(formData: FormData): Observable<BasicAPIResponse> {

    return this.http.post<BasicAPIResponse>(`${environment.apiUrl}create-observation/`,formData)

 }

 getUserObservation(): Observable<BasicAPIResponse> {

    return this.http.get<BasicAPIResponse>(`${environment.apiUrl}user-observatioins/`)

 }


}
