import { Component, Input, Output, EventEmitter } from '@angular/core';
import { uniqueAndNamed } from '../../../model/interfaces';

@Component({
  selector: 'selectable-list',
  template: `
      <ul>
        <li 
        *ngFor="let item of list" [ngClass]="{'selectable-list__item': true,
         'selectable-list__item--active': active.id === item.id }"
          (click)="activate(item)">{{ item.name }}</li>
      </ul>
    `,
  styleUrls: ['./selecteable-list.css']
})
export default class SelectableList {
  @Input() list: uniqueAndNamed[];
  @Output() onSelect: new EventEmitter<uniqueAndNamed();
  active: uniqueAndNamed;

  constructor() { }

  activate(option: uniqueAndNamed) {
    this.active = option;
    this.onSelect.emit(option);
  }
}
