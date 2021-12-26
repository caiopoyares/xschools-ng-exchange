import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage?: string;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this._api.postRequest('user/login', form.value).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this._auth.setDataInLocalStorage(
            'userData',
            JSON.stringify(res.data)
          );
          this._auth.setDataInLocalStorage('token', res.token);
          window.location.href = environment.react_url;
        } else {
          console.log(res);
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
  }

  isUserLogin() {
    console.log(this._auth.getUserDetails());
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    this._auth.clearStorage();
    this._router.navigate(['']);
  }
}
