import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourRemindersPageRoutingModule } from './your-reminders-routing.module';

import { YourRemindersPage } from './your-reminders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourRemindersPageRoutingModule,
  ],
  declarations: [YourRemindersPage]
})
export class YourRemindersPageModule {}
