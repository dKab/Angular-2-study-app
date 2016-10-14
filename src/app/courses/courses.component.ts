import { Component } from '@angular/core';



@Component({
  selector: 'courses',
  styleUrls: [ './courses.style.css' ],
  templateUrl: './courses.template.html'
})
export class Courses {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor() {

  }

  ngOnInit() {

    // this.title.getData().subscribe(data => this.data = data);
  }
}
