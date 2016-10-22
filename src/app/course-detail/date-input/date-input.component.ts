import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'date-input',
  template: `<input type="text"
   (keydown)="checkKey($event)"
   [ngModel]="date"
   maxlength="10"
   (ngModelChange)="checkModel($event)">{{ date }}`
})
export class DateInput {
  @Input() value: string;
  @Output() onDateChange = new EventEmitter<string>();

  date: string = '';
  pattern: RegExp = /^\d{2}\.\d{2}\.\d{4}$/;
  charMap: RegExp[] = [
    /\d/, /\d/, /\./, /\d/, /\d/, /\./, /\d/, /\d/, /\d/, /\d/
  ];

  ngOnInit() {
    this.date = this.value || this.date;
  }

  checkKey(event) {
    let index = this.date.length;

    switch (event.key) {
      case 'Backspace':
      case 'ArrowRight':
      case 'ArrowLeft':
            break;
      default:

        if (index >= this.charMap.length || !this.charMap[index].test(event.key)) {
          return false;
        }
        break;
    }
  }

  checkModel(value) {
    for (let i = 0; i<value.length; i++) {
      if (!this.charMap[i].test(value.charAt(i))) {
        this.date = '';
        return;
      }
    }
    this.date = value;
    this.onDateChange.emit(this.date);
  }
}
