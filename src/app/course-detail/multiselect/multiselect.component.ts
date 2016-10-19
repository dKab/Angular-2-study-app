import { Component, Input, Output, EventEmitter } from '@angular/core';
import { uniqueAndNamed, numberOrString } from '../../model/interfaces';

@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.html',
  styleUrls: ['./multiselect.css']
})
export class Multiselect {
  @Input() options: uniqueAndNamed[];
  @Input() selectedIds: numberOrString[];
  @Output() onSelectionChange = new EventEmitter<numberOrString[]>();

  unselectedActive: uniqueAndNamed;
  selectedActive: uniqueAndNamed;
  unselectedOptions: uniqueAndNamed[];
  selectedOptions:  uniqueAndNamed[];

  constructor() {}

  ngOnInit() {
    this.unselectedOptions = this.options.filter(option =>
      this.selectedIds.indexOf(option.id) === -1);
    this.selectedOptions = this.options.filter(option =>
      this.selectedIds.indexOf(option.id) !== -1);
  }

  setUnselectedActive(active: uniqueAndNamed) : void {
    this.unselectedActive = active;
  }

  setSelectedActive(active: uniqueAndNamed) : void {
    this.selectedActive = active;
  }

  select() : void {
    this.move(this.unselectedActive, 'unselectedOptions', 'selectedOptions');
    this.onSelectionChange.emit(this.selectedOptions.map(opt => opt.id));
  }

  unselect() : void {
    this.move(this.selectedActive, 'selectedOptions', 'unselectedOptions');
    this.onSelectionChange.emit(this.selectedOptions.map(opt => opt.id));
  }

  private move(item : uniqueAndNamed, from: string, to : string) : void {
    this[to] = this[to].concat(item);
    this[from] = this[from].filter(opt => item.id !== opt.id );
  }
}

