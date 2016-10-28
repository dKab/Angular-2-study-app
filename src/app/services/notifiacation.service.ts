import { Injectable } from '@angular/core';

@Injectable()
export default class Notifications {

  message: string;

  setMessage(msg) {
    this.message = msg;
  }

}
