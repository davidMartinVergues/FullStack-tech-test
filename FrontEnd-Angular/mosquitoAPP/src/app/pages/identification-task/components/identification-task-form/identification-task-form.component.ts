import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IdentificationTaskService } from '../../services/identification-task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IdentificationTask, UserObservation } from '../../../../shared/interfaces/shared.app.interfaces';
import { UserObservationService } from '../../../user-observation/services/user-observation.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'identification-task-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './identification-task-form.component.html',
  styleUrl: './identification-task-form.component.css'
})
export class IdentificationTaskFormComponent implements OnInit {

  observationForm: FormGroup;
  observations!: any;

  constructor(
    private snackbar:MatSnackBar,
    private fb: FormBuilder,
    private _identificationTaskService: IdentificationTaskService,
    private _userObservationService: UserObservationService
  ){
      this.observationForm = this.fb.group({
        observation: [''],
      });
    }

  ngOnInit(): void {

    this._userObservationService.getUserObservation().subscribe({
      next:(response)=>{

        this.observations = response.data

        console.log(response);

      }
    })

  }

  onSubmit() {

    console.log(this.observationForm.value);


    const formData = new FormData();
    formData.append('observation', this.observationForm.value.observation);
    this._identificationTaskService.newIdentificationTask(formData)
    this.observationForm.reset();
  }

}
