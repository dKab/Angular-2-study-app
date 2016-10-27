import { Component } from '@angular/core';
import LoginService from './login.service';
import AuthService from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: ['./login.style.css'],
  templateUrl: './login.template.html',
  providers: [
    LoginService
  ]
})
export class Login {
  loginForm: FormGroup;
  hasError: boolean;

  constructor(private loginService: LoginService,
              private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.hasError = false;
  }

  signInUser(login: string, password: string) {
    this.loginService.login(login, password)
      .subscribe((user) => {
        this.auth.startUserSession(user.name);
        let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/courses';
        // Redirect the user
        this.router.navigate([redirect]);
      }, () => {
        this.loginForm.patchValue({password: ''});
        this.hasError = true;
      });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z]+')
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]+')
      ]
      ],
    });
  }
}
