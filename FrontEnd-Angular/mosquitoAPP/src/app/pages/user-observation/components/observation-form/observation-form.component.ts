import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserObservationService } from '../../services/user-observation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'observation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './observation-form.component.html',
  styleUrl: './observation-form.component.css'
})
export class ObservationFormComponent {

  observationForm: FormGroup;
  selectedFile: File | null = null;


  constructor(
    private snackbar:MatSnackBar,
    private fb: FormBuilder,
    private observationService: UserObservationService
  ) {
    this.observationForm = this.fb.group({
      latitude: [''],
      longitude: ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('latitude', this.observationForm.value.latitude);
    formData.append('longitude', this.observationForm.value.longitude);
    formData.append('mosquito_img', this.selectedFile);

    this.observationService.newUserObservation(formData).subscribe({
      next: (response) => {

        this.snackbar.open(response.msg,'Cerrar',{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: response.ok ? 'custom-success-snackbar': 'custom-error-snackbar',
        });
        this.observationForm.reset();
      }
    });
  }
}
