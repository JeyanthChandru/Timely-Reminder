import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourRemindersPage } from './your-reminders.page';

const routes: Routes = [
  {
    path: '',
    component: YourRemindersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourRemindersPageRoutingModule {}
