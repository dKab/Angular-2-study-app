import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import CoursesService from '../services/courses.service';
import Course from '../model/course';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import AuthorsService from '../services/authors.service';
import Author from '../model/author';
import * as moment from 'moment';
import CourseService from '../services/course.service';

@Component({
  selector: 'course-detail',
  styleUrls: [ './course-detail.style.css' ],
  templateUrl: './course-detail.template.html'
})
export class CourseDetail {
  course: Course;
  authors: Author[];
  selectedAuthors: number[];
  dateInvalid: boolean;
  authorsTouched = false;
  formTouched = false;
  form: FormGroup;
  formInvalid: boolean;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router,  private coursesService: CoursesService,
    private datePipe: DatePipe, private authorsService: AuthorsService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (!isNaN(parseInt(params['id'], 10))) {
        let id = +params['id'];
        this.coursesService.getCourse(id)
          .forEach(course => {
            this.course = course;
            this.initForm(this.course);
            this.setTitle();
          })
          .catch(err => {
            if (err.status === 404) {
              this.form = null;
              this.setTitle('404');
            }
          });
      } else if (params['id'] === 'new') {
        this.course = new Course();
        this.initForm(this.course);
        this.setTitle('Create new course');
      }
    });

    this.authorsService.getAuthors()
      .subscribe( authors => {
        this.authors = authors;
        this.selectedAuthors = this.course.authors.map(author => author.id);
      }, err => console.error(err));
  }

  setTitle(name: string = null) {
    this.courseService.name = name || this.form.value.title;
  }

  goToCourses() { this.router.navigate(['/courses']); }

  onAuthorsSelectionChange(selectedAuthors: number[]) {
    this.authorsTouched = true;
    this.course.authors = this.authors.filter(author =>
      selectedAuthors.indexOf(author.id) >= 0 );
  }

  onDateChange(date: string) {
    let notTrustedDate = moment.utc(date, 'DD.MM.YYYY');
    if (notTrustedDate.isValid()) {
      this.course.date = moment.utc(date, 'DD.MM.YYYY').toISOString();
      this.dateInvalid = false;
    } else {
      this.dateInvalid = true;
    }
  }

  addOrUpdateCourse() {
    this.formTouched = true;
    if (!this.course.authors.length || this.dateInvalid || !this.form.valid) {
      this.formInvalid = true;
      return;
    }
    this.formInvalid = false;
    let observable;
    Object.assign(this.course, this.form.value);
    if (this.course.id) {
      observable = this.coursesService.updateCourse(this.course);
    } else {
      observable = this.coursesService.addCourse(this.course);
    }
    observable.subscribe(() => this.goToCourses(), (err) => console.log(err));
  }

  private initForm(course: Course) {
    this.form = this.formBuilder.group({
      title: [course.title, [Validators.required]],
      duration: [course.id ? course.duration : '',
        [Validators.required, Validators.pattern('[0-9]+')]],
      description: course.description
    });
  }
}
