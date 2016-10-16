import { Component, EventEmitter, Output } from '@angular/core';
import Course from '../../model/course';
import CoursesService from '../../services/courses.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'courses-search',
  template: `
     <div class="search">
      <input type="text" #term (keyup)="0"  class="search__input" placeholder="Фрагмент имени или дата">
      <button class="search__button button" (click)="filterCourses(term.value)">Найти</button>
     </div>
  `
})
export class CoursesSearch {
  @Output() onFilterChange = new EventEmitter<Course[]>();

  constructor(private coursesService: CoursesService, private datePipe: DatePipe) { }

  filterCourses(term: string) {
     this.coursesService.getCourses()
      .subscribe((courses) => {
        this.onFilterChange.emit(courses.filter(course => {
          let courseDateFormatted = this.datePipe.transform(course.date, 'dd.MM.y');
          return courseDateFormatted.indexOf(term) !== -1 || course.title.indexOf(term) !== -1;
        }));
    });
  }
}
