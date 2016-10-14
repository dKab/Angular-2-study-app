import { Component } from '@angular/core';
import CoursesService from '../services/courses.service';
import Course from '../model/course';

@Component({
  selector: 'courses',
  styleUrls: [ './courses.style.css' ],
  templateUrl: './courses.template.html'
})
export class Courses {
  courses: Course[];
  // TypeScript public modifiers
  constructor(private service: CoursesService) {

  }

  ngOnInit() {
      this.service.getCourses()
        .then((courses) => {
          this.courses = courses;
        }
        ).catch((err) => console.log(err));
  }
}
