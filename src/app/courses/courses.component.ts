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
    this.getCourses();
  }

  getCourses() {
    this.service.getCourses()
      .subscribe((courses) => {
        this.courses = courses;
      }, err => {
        console.error('An error occurred', err);
        this.courses = [];
      });
  }

  deleteCourse(course: Course) {
   this.service.deleteCourse(course.id)
      .subscribe(() => {
        this.courses = this.courses.filter(c => c.id !== course.id);
      }, (err) => {
        console.error('Could not delete a course', err);
      });
  }

  goToDetail(course: Course) {
    this.router.navigate([`/course/${course.id}`]);
  }

  goToAdd() {
    this.router.navigate(['/course/new']);
  }

  onFilterChange(courses: Course[]) {
     this.courses = courses;
  }
}
