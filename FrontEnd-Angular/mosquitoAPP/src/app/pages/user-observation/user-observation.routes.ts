import { Routes } from '@angular/router';
import { UserObservationComponent } from './pages/user-observation/user-observation.component';
import { ObservationFormComponent } from './components/observation-form/observation-form.component';

export const USEROBSERVATIONS_ROUTES : Routes = [
  {path: '',
    children:[
     { path: '', component: UserObservationComponent},
     { path: 'new', component: ObservationFormComponent },
     { path: '**', redirectTo: '/user-observation', pathMatch: 'full' }
    ]
 },
]
