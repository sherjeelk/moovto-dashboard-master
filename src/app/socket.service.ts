import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  notifications = [];
  riders = [];
  public lng = 0;
  public lat = 0;

  constructor(private socket: Socket, private http: HttpClient) {
   this.getNotifications();
   this.getAllNotifications();
   this.getAllRiders();
   this.getRiders();
  }

  getNotifications() {
    this.socket.on('admin', value => {
      this.notifications.push(value);
    });
  }

  getAllRiders() {
    this.http.post('https://www.easyshifters.com/api/riders', {}).subscribe(
      value => {
        console.log('Riders', value);
        const result = JSON.parse(JSON.stringify(value));
        console.log('Riders', result.rider.length + ' Online');
        if (result.status === 1) {
          let obj = result.rider;
          obj = _.filter(obj, user => user.lat !== undefined);
          if (obj.length > 0) {
            const pos = 0;
            let mObject = obj[pos];
            mObject = obj[pos];
            this.lat = +mObject.lat;
            this.lng = +mObject.lng;
            this.riders = [];
            this.riders = obj;
          } else {
            this.currentLocation();
          }
        } else {
          this.currentLocation();
        }
      },
      error => {
        console.log('An error occurred while trying to fetch riders', error);
      }
    );
  }

  private currentLocation() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }


  getRiders() {
    this.socket.on('riders', value => {
      if (value !== null && value.length > 0) {
        console.log('Rider Values', value);
        this.lat = +value[0].lat;
        this.lng = +value[0].lng;
        this.riders = value;
      } else {
        if (value.length === 0) {
          console.log('All removed!', value);
          this.riders = [];
        }
      }
    });
  }

  getAllNotifications() {
    this.socket.on('notifications', value => {
      this.notifications = value;
    });
  }

  assignDelivery(data) {
    this.socket.emit('delivery', data);
    console.log('Message sent on channel delivery', data);
  }

  closeNotification(id: string) {
    this.socket.emit('notifications', id);
  }
}
