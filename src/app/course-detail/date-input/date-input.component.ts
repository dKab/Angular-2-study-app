import { Component, Output, Input, EventEmitter, SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'date-input',
  template: `<input type="text"
   (keydown)="checkKey($event)"
   [ngModel]="date"
   maxlength="10"
   (ngModelChange)="checkModel($event)">`
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

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.date = changes['value'].currentValue;
  }

  checkKey(event) {
    let index = this.date.length;

    switch (event.key) {
      case 'Backspace':
      case 'Tab':
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
    if (this.pattern.test(this.date)) {
      this.onDateChange.emit(this.date);
    }
  }
}
