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

  setUnselectedActive(active: uniqueAndNamed) {


  }

  setSelectedActive(active: uniqueAndNamed) {

  }

  select(option: uniqueAndNamed) {

  }

  unselect(option: uniqueAndNamed) {

  }
}

