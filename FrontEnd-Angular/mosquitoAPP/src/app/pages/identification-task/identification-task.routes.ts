import { Routes } from '@angular/router';
import { IdentificationTaskComponent } from './pages/identification-task/pages/identification-task/identification-task.component';

export const IDENTIFICATIONTASK_ROUTES : Routes = [
  {path: '',
    children:[
     { path: '', component: IdentificationTaskComponent},
      { path: '**', redirectTo: '/user-observation', pathMatch: 'full' }
    ]
 },
]
