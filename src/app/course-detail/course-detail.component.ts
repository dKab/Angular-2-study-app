import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import CoursesService from '../services/courses.service';
import Course from '../model/course';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import AuthorsService from '../services/authors.service';
import Author from '../model/author';

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
  authors: Author[];
  selectedAuthors: number[];
  form: FormGroup;
  // TypeScript public modifiers
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router,  private coursesService: CoursesService,
    private datePipe: DatePipe, private authorsService: AuthorsService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (!isNaN(parseInt(params['id'], 10))) {
        let id = +params['id'];
        this.coursesService.getCourse(id)
          .forEach(course => {
            this.course = course;
            this.initForm(this.course);
          });
      } else if (params['id'] === 'new') {
        this.course = new Course();
        this.initForm(this.course);
      }
    });

    this.authorsService.getAuthors()
      .subscribe( authors => {
        this.authors = authors;
        this.selectedAuthors = this.course.authors.map(author => author.id);
      }, err => console.error(err));
  }

  goToCourses() { this.router.navigate(['/courses']); }

  onAuthorsSelectionChange(selectedAuthors: number[]) {
    this.course.authors = this.authors.filter(author =>
      this.selectedAuthors.indexOf(author.id) >= 0 );
  }

  private initForm(course: Course) {
    this.form = this.formBuilder.group({
      title: course.title,
      duration: course.id ? course.duration : '',
      date: course.id ? this.datePipe.transform(course.date, 'dd.MM.y') : '',
      description: course.description
    });
  }
}
