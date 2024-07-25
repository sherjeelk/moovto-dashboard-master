import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {AlertService} from 'ngx-alerts';
import {SocketService} from '../socket.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = '';
  constructor(private storage: LocalStorageService, private router: Router, private alert: AlertService, public socket: SocketService) { }

  ngOnInit() {
      this.username = this.storage.retrieve('user').name;
  }

  logout() {
    this.storage.clear('login');
    this.storage.clear('token');
    this.storage.clear('user');
    this.alert.success('You are logged successfully!');
    this.router.navigateByUrl('/login');
  }
}
