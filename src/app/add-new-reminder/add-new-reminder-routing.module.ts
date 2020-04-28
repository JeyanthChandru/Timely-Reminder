import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewReminderPage } from './add-new-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewReminderPageRoutingModule {}
