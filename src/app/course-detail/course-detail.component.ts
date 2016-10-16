import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import CoursesService from '../services/courses.service';
import Course from '../model/course';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'course-detail',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './course-detail.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './course-detail.template.html'
})
export class CourseDetail {
  course: Course;
  form: FormGroup;
  // TypeScript public modifiers
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private router: Router,  private coursesService: CoursesService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (!isNaN(parseInt(params['id']))) {
        let id = +params['id'];
        this.coursesService.getCourse(id)
          .forEach(course => {
            this.course = course;
            this.initForm(this.course);
          });
      } else if (params['id'] === 'new') {
        this.initForm();
      }
    });
  }
  goToCourses() { this.router.navigate(['/courses']); }

  private initForm(course: Course = null) {
    this.form = this.formBuilder.group({
      title: course ? course.title : '',
      duration: course ? course.duration : '',
      date: course? this.datePipe.transform(course.date, 'dd.MM.y') : '',
      description: course ? course.description : ''
    });
  }
}
