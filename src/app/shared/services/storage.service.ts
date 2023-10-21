import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public get(key: string) {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data || 'undefined');
    } catch (e) {
      return undefined;
    }
  }

  public set(key: string, value: unknown): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
