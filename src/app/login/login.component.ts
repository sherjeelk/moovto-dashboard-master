import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../AppConstants';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private storage: LocalStorageService, private router: Router) { }

  ngOnInit() {
  }

  login(email, pass) {
    const body = {
      identifier: email,
      password: pass
    };

    this.http.post(AppConstants.API.LOGIN, body).subscribe(
      (res) => {
        const result = JSON.parse(JSON.stringify(res));
        console.log('Result', result);
        if (result.user.role.name === 'Administrator') {
          this.storage.store('user', result.user);
          this.storage.store('token', result.jwt);
          this.storage.store('login', true);
          AppConstants.user = result.user;
          AppConstants.token = result.jwt;
          AppConstants.IS_LOGGED_IN = true;
          this.router.navigateByUrl('/');
        } else {
          console.log('You are not a admin!');
        }

      },
      (error) => {
        console.error(error);
      }
    );
  }

}
