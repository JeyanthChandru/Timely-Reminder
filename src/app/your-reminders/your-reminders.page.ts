import { Component, OnInit } from '@angular/core';
import { Reminder } from '../dao/Reminder';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { StorageHelperService } from '../storage-helper.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-your-reminders',
  templateUrl: './your-reminders.page.html',
  styleUrls: ['./your-reminders.page.scss'],
})
export class YourRemindersPage implements OnInit {

  private arrayOfReminders: Reminder[] = [];

  constructor(
    private storageHelperService: StorageHelperService, 
    private router: Router, 
    private route: ActivatedRoute,
    private notificationsService: NotificationsService) {

   }

  ngOnInit() {
    this.storageHelperService.getReminders().then((reminders) => {
      this.arrayOfReminders = JSON.parse(reminders);
    })
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(() => {
      if (history.state && history.state.reminders != null) {
        this.arrayOfReminders = history.state.reminders;
      }
    });
  }

  editReminder(reminder: Reminder, i: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        reminder: reminder,
        index: i
      }
    };
    this.router.navigate(['add-new-reminder'], navigationExtras);
  }

  removeReminder(i: number) {
    this.arrayOfReminders.splice(i, 1);
    this.storageHelperService.setReminders(JSON.stringify(this.arrayOfReminders));
  }

}
