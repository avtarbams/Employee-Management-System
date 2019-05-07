import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterServiceService {

  callInvokeFromAlert = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onButtonClickedFromAlert(data) {
    this.callInvokeFromAlert.emit(data);
  }

}


