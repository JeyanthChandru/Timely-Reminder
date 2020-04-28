import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-new-reminder',
    loadChildren: () => import('./add-new-reminder/add-new-reminder.module').then( m => m.AddNewReminderPageModule)
  },
  {
    path: 'your-reminders',
    loadChildren: () => import('./your-reminders/your-reminders.module').then( m => m.YourRemindersPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
