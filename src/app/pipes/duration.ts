import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor(value / 60),
      minutes = (value < 60) ? value || 0 : value % 60,
      minutesWord = 'мин.', hoursWord;

    switch (hours%10) {
      case 1:
          hoursWord = 'час';
      break;
      case 2:
      case 3:
      case 4:
          hoursWord = 'часа';
          break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
          hoursWord = 'часов';
          break;
    }
    return `${hours} ${hoursWord} ${minutes} ${minutesWord}`;
  }
}
