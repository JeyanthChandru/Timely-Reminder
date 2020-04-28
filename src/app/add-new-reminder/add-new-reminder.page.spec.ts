import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewReminderPage } from './add-new-reminder.page';

describe('AddNewReminderPage', () => {
  let component: AddNewReminderPage;
  let fixture: ComponentFixture<AddNewReminderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewReminderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
