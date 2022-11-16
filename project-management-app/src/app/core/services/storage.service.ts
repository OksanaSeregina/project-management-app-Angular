import { Injectable } from '@angular/core';
import { ValueOf } from '../../types';
import { IStorage } from '../models';

const STORAGE_KEY = 'project-managment-app';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public set(key: keyof IStorage, value: ValueOf<IStorage>): void {
    const storage: IStorage = this.getStorage();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage ? { ...storage, [key]: value } : { [key]: value }));
  }

  public get(key: keyof IStorage): ValueOf<IStorage> | undefined {
    const storage: IStorage = this.getStorage();
    if (storage) {
      return storage[key];
    }
    return;
  }

  public clear(): void {
    localStorage.setItem(STORAGE_KEY, '');
  }

  public remove(key: keyof IStorage): void {
    const storage: IStorage = this.getStorage();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(storage ? { ...storage, [key]: undefined } : { [key]: undefined }),
    );
  }

  private getStorage(): IStorage {
    const storage: string | null = localStorage.getItem(STORAGE_KEY);
    return storage ? <IStorage>JSON.parse(storage) : <IStorage>{};
  }
}
