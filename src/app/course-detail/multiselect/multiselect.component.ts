import { Component, Input, Output, EventEmitter } from '@angular/core';
import { uniqueAndNamed, numberOrString } from '../../model/interfaces';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.html',
  styleUrls: ['./multiselect.css']
})
export class Multiselect {
  @Input() options: uniqueAndNamed[];
  @Input() selectedIds: numberOrString[];
  @Output() onSelectionChange = new EventEmitter<numberOrString[]>();

  unselectedOptions: uniqueAndNamed[];
  selectedOptions:  uniqueAndNamed[];
  selected: uniqueAndNamed[];
  unselected: uniqueAndNamed[];

  constructor() {}

  ngOnInit() {
    this.unselectedOptions = this.options.filter(option => this.selectedIds.indexOf(option.id) === -1);
    this.selectedOptions = this.options.filter(option => this.selectedIds.indexOf(option.id) !== -1);
  }

  select() : void {
    this.selectedOptions = this.selectedOptions.concat(this.unselected);
    this.unselectedOptions = this.unselectedOptions.filter(option => this.unselected.indexOf(option) === -1);
    this.onSelectionChange.emit(this.selectedOptions.map(option => option.id));
  }

  unselect() : void {
    this.unselectedOptions = this.unselectedOptions.concat(this.selected);
    this.selectedOptions = this.selectedOptions.filter(option => this.selected.indexOf(option) === -1);
    this.onSelectionChange.emit(this.selectedOptions.map(option => option.id));
  }
}

