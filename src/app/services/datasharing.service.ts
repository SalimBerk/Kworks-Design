import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasharingService {
  constructor() {}

  private sharingData = new BehaviorSubject<any>(null);
  currentData = this.sharingData.asObservable();

  changeData(data: any) {
    this.sharingData.next(data);
  }
}
