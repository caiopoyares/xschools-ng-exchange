import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  errorMessage?: string;

  constructor(private _api: ApiService, private _router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this._api.postRequest('user/register', form.value).subscribe(
      (res: any) => {
        if (res.id) {
          console.log(res);
          this._router.navigate(['/login'], { queryParams: { new: true } });
        } else {
          this.errorMessage =
            'Ops, error during account creation. Please try again.';
        }
      },
      (err) => {
        this.errorMessage =
          'Ops, error during account creation. Please try again.';
        console.log(err.message);
      }
    );
  }
}
