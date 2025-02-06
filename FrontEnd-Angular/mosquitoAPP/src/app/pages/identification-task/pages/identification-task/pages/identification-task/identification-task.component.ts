import { Component, OnInit } from '@angular/core';
import { IdentificationTaskService } from '../../../../services/identification-task.service';
import { IdentificationTask } from '../../../../../../shared/interfaces/shared.app.interfaces';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { IdentificationTaskFormComponent } from '../../../../components/identification-task-form/identification-task-form.component';
import { Subject } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'identification-task',
  standalone: true,
  imports: [MatIconModule,MatSlideToggleModule,MatTableModule,MatInputModule,MatFormFieldModule,CommonModule,IdentificationTaskFormComponent],
  templateUrl: './identification-task.component.html',
  styleUrl: './identification-task.component.css'
})
export class IdentificationTaskComponent implements OnInit{

  displayedColumns: string[] = ['user_observation', 'status', 'action'];
  dataSource = new MatTableDataSource<IdentificationTask>;

  constructor(
    private  _identificationTaskService:IdentificationTaskService,
    private snackbar:MatSnackBar
  ){}



  ngOnInit(): void {
    this._identificationTaskService.getIdentificationTask()
    this.identificationTasks()
  }

  identificationTasks(){
    this._identificationTaskService.identificationTask$.subscribe({
      next:(response)=>{
        console.log(response);
          this.dataSource.data = response
      }
    })

  }

  filterByStatus(event:Event){
    const target = event.target as HTMLSelectElement;
    const status = target?.value ?? '';

    if (status === '') {

      this.identificationTasks();

    } else {

      this._identificationTaskService.getIdentificationTaskByStatus(status).subscribe({
        next: (response) => {
          this.dataSource.data = response.data || [];
        }
      });
    }

  }

  changeStatusToComplete(event: any, element: any) {
    const isChecked = event.checked;


    this._identificationTaskService.toggleToComplete(element.id).subscribe({
      next:(response)=>{
        if(response.ok){

          this._identificationTaskService.getIdentificationTask()
        }
      }
    })

  }

  deleteIdentification(id:number){

    this._identificationTaskService.deleteTask(id).subscribe({
      next:(response)=>{
        if(response.ok){
          this.snackbar.open(response.msg,'Cerrar',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: response.ok? 'custom-success-snackbar': 'custom-error-snackbar',
          });
          this._identificationTaskService.getIdentificationTask()

        }
      }
    })


  }




}
