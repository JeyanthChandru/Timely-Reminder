import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { PickerController, Platform, AlertController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import { Reminder } from '../dao/Reminder';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageHelperService } from '../storage-helper.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-add-new-reminder',
  templateUrl: './add-new-reminder.page.html',
  styleUrls: ['./add-new-reminder.page.scss'],
})
export class AddNewReminderPage implements OnInit {

  private reminder: FormGroup;
  private reminderTitle: string;
  private reminderFrom: string;
  private reminderOn: string;
  private reminderRepeat: string = "Once";
  // private repeat: boolean;
  private pageTitle: string;
  // private repetition: string = "1";
  // private times: string = "time";
  private index: number = null;
  private id: number;
  reminderDateFrequency: string[] = ["Once", "Daily", "Weekly", "Monthly", "Yearly"];
  // reminderTimeFrequency: string[] = ["Minutes", "Hours"];
  // selectedTimeFrequency: string[] = ['10', 'Minutes'];

  constructor(
    private formBuilder: FormBuilder,
    private pickerController: PickerController,
    private router: Router,
    private route: ActivatedRoute,
    private storageHelperService: StorageHelperService,
    private platform: Platform,
    private alertController: AlertController,
    private notificationsService: NotificationsService) {
    this.reminder = this.formBuilder.group({
      reminderTitle: new FormControl('', Validators.required),
      reminderFrom: new FormControl(new Date().toISOString(), [Validators.required]),
      reminderOn: new FormControl(new Date().toISOString(), Validators.required),
      // repeat: new FormControl(true, Validators.required),
    });
  }

  ngOnInit() {
    this.pageTitle = "Add a new reminder";
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(() => {
      if (history.state && history.state.reminder != null && history.state.index != null) {
        this.pageTitle = "Edit Reminder";
        var currentReminder: Reminder = history.state.reminder;
        this.index = history.state.index;
        this.id = history.state.id;
        this.reminder = this.formBuilder.group({
          reminderTitle: new FormControl(currentReminder.reminderTitle, Validators.required),
          reminderFrom: new FormControl(currentReminder.reminderFrom, [Validators.required]),
          reminderOn: new FormControl(currentReminder.reminderOn, Validators.required),
          // repeat: new FormControl(currentReminder.repeat, Validators.required),
        });

        // if (currentReminder.repeat) {
        //   this.selectedTimeFrequency = currentReminder.selectedTimeFrequency;
        //   this.reminderRepeat = currentReminder.reminderRepeat;
        //   this.repetition = currentReminder.repetition;
        // }
      } else {
        this.pageTitle = "Add a New Reminder";
      }
    });
  }

  async setReminder() {
    var newReminder: Reminder = new Reminder(this.reminder.value.reminderTitle, this.reminder.value.reminderFrom, this.reminder.value.reminderOn/*, this.reminder.value.repeat*/);
    // if (this.reminder.value.repeat) {
    //   newReminder.selectedTimeFrequency = this.selectedTimeFrequency;
    //   newReminder.reminderRepeat = this.reminderRepeat;
    //   newReminder.repetition = this.repetition;
    // }
    var arrayOfReminders: Reminder[] = JSON.parse(await this.storageHelperService.getReminders());
    if (this.index != null) {
      newReminder.id = this.id;
      arrayOfReminders.splice(this.index, 1);
    } else {
      if (arrayOfReminders.length > 0) {
        var tempReminder: Reminder = arrayOfReminders[arrayOfReminders.length - 1];
        this.id = tempReminder.id;
        newReminder.id = this.id + 1;
      }
      else {
        newReminder.id = 1;
      }
    }
    arrayOfReminders.push(newReminder);
    console.log("Reminders: " + JSON.stringify(arrayOfReminders));
    this.storageHelperService.setReminders(JSON.stringify(arrayOfReminders));
    if(newReminder.reminderRepeat == 'Once'){
      this.notificationsService.scheduleReminderOnce(newReminder);
    }
    else {
      this.notificationsService.scheduleReminderRecurring(newReminder);
    }
    this.resetData();

    let navigationExtras: NavigationExtras = {
      state: {
        reminders: arrayOfReminders,
      }
    };
    this.router.navigate([''], navigationExtras);
  }

  resetData(): void {
    // this.selectedTimeFrequency = ['10', 'Minutes'];
    this.reminderRepeat = "Once";
    // this.repetition = "1";
    this.index = null;
    this.reminder.reset();
    this.reminder = this.formBuilder.group({
      reminderTitle: new FormControl('', Validators.required),
      reminderFrom: new FormControl(new Date().toISOString(), [Validators.required]),
      reminderOn: new FormControl(new Date().toISOString(), Validators.required),
      // repeat: new FormControl(true, Validators.required),
    });
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }

  async showReminderRepeat() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value) => {
            this.reminderRepeat = value.reminderDate.value;
          }
        }
      ],
      columns: [{
        name: 'reminderDate',
        options: this.getColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    await picker.present();
  }

  getColumnOptions(): any {
    let options = [];
    this.reminderDateFrequency.forEach(x => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  // async showReminderFrequency() {
  //   let options: PickerOptions = {
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Ok',
  //         handler: (value) => {
  //           this.selectedTimeFrequency[0] = value.reminderTimeNumber.value;
  //           this.selectedTimeFrequency[1] = value.reminderTimeFrequency.value;
  //         }
  //       }
  //     ],
  //     columns: [
  //       {
  //         name: 'reminderTimeNumber',
  //         options: this.getColumnOptionsForNumber(this.selectedTimeFrequency[1])
  //       },
  //       {
  //         name: 'reminderTimeFrequency',
  //         options: [
  //           { text: 'Minutes', value: 'Minutes' },
  //           { text: 'Hours', value: 'Hours' }
  //         ]
  //       }
  //     ]
  //   };

  //   let picker = await this.pickerController.create(options);
  //   await picker.present();
  // }

  // getColumnOptionsForNumber(column: String): any {
  //   let options = [];
  //   if (column === "Minutes") {
  //     for (var i = 1; i <= 60; i++) {
  //       options.push({ text: i, value: i });
  //     }
  //   } else if (column === "Hours") {
  //     for (var i = 1; i <= 24; i++) {
  //       options.push({ text: i, value: i });
  //     }
  //   } else {
  //     for (var i = 1; i <= 10; i++) {
  //       options.push({ text: i, value: i });
  //     }
  //   }

  //   return options;
  // }

  // async showRepetition() {
  //   let options: PickerOptions = {
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Ok',
  //         handler: (value) => {
  //           this.repetition = value.repetition.value;
  //           this.times = Number(this.repetition) > 1 ? "times" : "time";
  //         }
  //       }
  //     ],
  //     columns: [{
  //       name: 'repetition',
  //       options: this.getColumnOptionsForNumber("")
  //     }]
  //   };

  //   let picker = await this.pickerController.create(options);
  //   await picker.present();
  // }

}
