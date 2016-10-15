import { Component } from '@angular/core';
import CoursesService from '../services/courses.service';
import Course from '../model/course';
import { Router } from '@angular/router';

@Component({
  selector: 'courses',
  styleUrls: [ './courses.style.css' ],
  templateUrl: './courses.template.html'
})
export class Courses {
  courses: Course[];
  constructor(private service: CoursesService, private router: Router) { }

  ngOnInit() {
      this.service.getCourses()
        .subscribe((response) => {
            this.courses = response.json() as Course[];
          },
          (err) => {
            console.error('An error occurred', err);
          }
        );
  }

  deleteCourse(course: Course) {
    this.service.deleteCourse(course.id)
      .subscribe(() => {
        this.courses = this.courses.filter(c => c !== course);
      }, (err) => {
        console.error('Could not delete a course', err);
      });
  }

  goToDetail(course: Course) {
    this.router.navigate([`/course-detail/${course.id}`]);
  }

  goToAdd() {
    this.router.navigate(['/course-detail']);
  }

  updateCourses() {

  }
}
