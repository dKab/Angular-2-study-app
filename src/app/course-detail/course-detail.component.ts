import { Component } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'course-detail',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './course-detail.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './course-detail.template.html'
})
export class CourseDetail {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState) {

  }

  ngOnInit() {
    console.log('hello `Detail` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
}
