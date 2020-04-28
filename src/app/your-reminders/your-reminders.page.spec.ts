import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YourRemindersPage } from './your-reminders.page';

describe('YourRemindersPage', () => {
  let component: YourRemindersPage;
  let fixture: ComponentFixture<YourRemindersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourRemindersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YourRemindersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
