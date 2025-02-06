import { Routes } from '@angular/router';

export const routes: Routes = [  {
  path: 'user-observation',
  loadChildren: () => import('./pages/user-observation/user-observation.routes').then(m=>m.USEROBSERVATIONS_ROUTES)
},{
  path: 'identification-task',
  loadChildren: () => import('./pages/identification-task/identification-task.routes').then(m=>m.IDENTIFICATIONTASK_ROUTES)
}

];
