import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Reminder } from './dao/Reminder';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private alertController: AlertController) {
      this.platform.ready().then(() => {
        this.localNotifications.on('click').subscribe(res => {
          console.log('click: ' + res);
          let message = res.data ? res.data.myData : ' ';
          this.showAlert(res.title, res.text, message);
        });
  
        this.localNotifications.on('trigger').subscribe((res) => {
          console.log('trigger: ' + res);
          let message = res.data ? res.data.myData : ' ';
          this.showAlert(res.title, res.text, message);
        });
      });
     }

  expectNotifications() : void {
    this.platform.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        console.log('click: ' + res);
        let message = res.data ? res.data.myData : ' ';
        this.showAlert(res.title, res.text, message);
      });

      this.localNotifications.on('trigger').subscribe((res) => {
        console.log('trigger: ' + res);
        let message = res.data ? res.data.myData : ' ';
        this.showAlert(res.title, res.text, message);
      });
    });
  }

  showAlert(header: string, subject: string, message: string): void {
    this.alertController.create({
      header: header,
      subHeader: subject,
      message: message,
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  scheduleReminderOnce(reminder: Reminder) {
    this.localNotifications.schedule({
      id: reminder.id,
      title: 'Reminder Notification',
      text: reminder.reminderTitle,
      data: { myData: 'Reminder for ' + reminder.reminderTitle },
      trigger: { at: this.buildDateTime(reminder.reminderFrom, reminder.reminderOn) },
      foreground: true
    });
  }

  scheduleReminderRecurring(reminder: Reminder) {
    this.localNotifications.schedule({
      id: reminder.id,
      title: 'Reminder Notification',
      text: reminder.reminderTitle,
      data: { myData: 'Reminder for ' + reminder.reminderTitle },
      trigger: { every: this.getRecurrenceFactor(reminder.reminderRepeat) },
      foreground: true
    });
  }

  scheduleReminderRepeativeRecurring(reminder: Reminder) {
    this.localNotifications.schedule({
      id: reminder.id,
      title: 'Reminder Notification',
      text: reminder.reminderTitle,
      data: { myData: 'Reminder for ' + reminder.reminderTitle },
      trigger: { every: this.getRecurrenceFactor(reminder.reminderRepeat) },
      foreground: true
    });
  }

  getRecurrenceFactor(reminderRepeat: string) : ELocalNotificationTriggerUnit {
    switch (reminderRepeat) {
      case 'Daily':
        return ELocalNotificationTriggerUnit.DAY;
      case 'Weekly':
        return ELocalNotificationTriggerUnit.WEEK;
      case 'Monthly':
        return ELocalNotificationTriggerUnit.MONTH;
      case 'Yearly':
        return ELocalNotificationTriggerUnit.YEAR;
    }
  }

  buildDateTime(reminderFrom: string, reminderOn: string): Date {
    var newDate: Date = new Date(reminderFrom);
    var newTime: Date = new Date(reminderOn);

    newDate.setHours(newTime.getHours());
    newDate.setMinutes(newTime.getMinutes());
    return newDate;
  }


}
