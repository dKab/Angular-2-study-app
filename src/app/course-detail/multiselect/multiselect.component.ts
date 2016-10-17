import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Unique, numberOrString } from '../../model/unique';

@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.html',
  styleUrls: ['./multiselect.css']
})
export class Multiselect {
  @Input() options: Unique[];
  @Input() selectedIds: numberOrString[];
  unselectedActive: Unique;
  selectedActive: Unique;
  @Output() onSelectionChange = new EventEmitter<numberOrString[]>();

  constructor() {

  }

  ngOnInit() {
    console.log(this.options);
    console.log(this.selectedIds);
  }

  select(option: Unique) {

  }

  unselect(option: Unique) {

  }
}

