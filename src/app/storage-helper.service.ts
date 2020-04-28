import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Reminder } from './dao/Reminder';

@Injectable({
  providedIn: 'root'
})
export class StorageHelperService {

  constructor(private storage: Storage) { }

  private setStorage(key: string, value: String) {
    this.storage.set(key, value);
  }
  private async getStorage(key: string) {
    return await this.storage.get(key);
  }
  private async remove(key: string) {
    return await this.storage.remove(key);
  }

  private async isStorageReady() {
    return await this.storage.ready();
  }

  public async getReminders() {
    return await this.isStorageReady().then(() => this.getStorage('reminders'));
  }

  public setReminders(value: String) {
    this.setStorage('reminders', value);
  }

  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }
}
