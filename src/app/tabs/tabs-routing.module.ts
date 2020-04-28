import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'your-reminders',
        loadChildren: () => import('../your-reminders/your-reminders.module').then(m => m.YourRemindersPageModule)
      },
      {
        path: 'add-new-reminder',
        loadChildren: () => import('../add-new-reminder/add-new-reminder.module').then(m => m.AddNewReminderPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/your-reminders',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/your-reminders',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
