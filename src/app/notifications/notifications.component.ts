import {Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../AppConstants';
import * as moment from 'moment';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router'; // add this 1 of 4

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(public socketService: SocketService, private httpClient: HttpClient, private storage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    const  login = this.storage.retrieve('login');
    AppConstants.token = this.storage.retrieve('token');
    if (!login) {
      this.router.navigateByUrl('/login');
    } else {
      this.getNotifications();
    }
  }

  getNotifications() {
    this.httpClient.post(AppConstants.API.NOTIFICATIONS, {}).subscribe(data => {
      console.log('Notifications info', this.socketService.notifications);
      this.socketService.notifications = JSON.parse(JSON.stringify(data));
    }, error => {
        console.log('An error occurred in notifications', error);
    });
  }

  closeNotification(id: string) {
    this.socketService.closeNotification(id);
  }

  formattedDate(id: any) {
    return moment(id, 'x').format('DD MMM YYYY hh:mm a'); // parse string
  }
}
