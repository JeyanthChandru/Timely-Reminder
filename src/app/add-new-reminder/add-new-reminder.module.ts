import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewReminderPageRoutingModule } from './add-new-reminder-routing.module';

import { AddNewReminderPage } from './add-new-reminder.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddNewReminderPageRoutingModule
  ],
  declarations: [AddNewReminderPage],
})
export class AddNewReminderPageModule {}
