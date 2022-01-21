import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isNew: boolean = false;
  email: string = '';
  emailSent: boolean = false;
  errorMessage?: string;
  codeErrorMessage?: string;

  constructor(private _api: ApiService, private _route: ActivatedRoute) {}

  ngOnInit() {
    this.isUserNew();
  }

  onSubmit(form: NgForm) {
    this.isNew = false;
    this._api.postRequest('user/login', form.value).subscribe(
      (res: any) => {
        console.log(res);
        this.errorMessage = '';
        this.emailSent = true;
        this.email = form.value.email;
      },
      (err) => {
        console.log(err);
        this.errorMessage = 'Email not found. Please try again!';
      }
    );
  }

  onCodeSubmit(form: NgForm) {
    this._api
      .postRequest('user/otp-validation', {
        email: this.email,
        code: form.value.code,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          document.location.href = environment.react_url;
        },
        (err) => {
          console.log(err);
          this.codeErrorMessage =
            'Error during the verification code authentication.';
        }
      );
  }

  isUserNew() {
    this._route.queryParams.subscribe((params) => {
      if (params['new']) {
        this.isNew = true;
      }
    });
  }

  returnToLogin() {
    this.email = '';
    this.emailSent = false;
    this.errorMessage = '';
    this.codeErrorMessage = '';
  }
}
