import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {AppConstants} from '../AppConstants';
import {HttpClient} from '@angular/common/http';
import {Socket} from 'ngx-socket-io';
import {MatSnackBar} from '@angular/material';
import * as moment from 'moment'; // add this 1 of 4
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rider;
  statuses = [
    'All Orders',
    'PENDING',
    'FAILED',
    'ASSIGNED DELIVERY',
    'PICKUP COMPLETE',
    'DROP COMPLETE',
    'PAYMENT FAILED',
    'COMPLETE'
  ];
  status = 'All Orders';
  constructor(private storage: LocalStorageService, private router: Router, private http: HttpClient,
              private socket: Socket, public snack: MatSnackBar) { }

  title = 'Snatch Dashboard';
  lat = 51.678418;
  lng = 7.809007;
  orders: any;
  allOrders: any;
  ORDER;
  styles = AppConstants.styles;
  dateChoose = Date();

  ngOnInit() {
    const  login = this.storage.retrieve('login');
    AppConstants.token = this.storage.retrieve('token');
    if (!login) {
      this.router.navigateByUrl('/login');
    } else {
      this.getOrders();
    }
  }

  getOrders() {
    console.log('GET ORDERS', {headers: { Authorization: `Bearer ${AppConstants.token}`}});
    this.http.get(AppConstants.API.ORDERS + '?_limit=3000', {headers: { Authorization: `Bearer ${AppConstants.token}`}}).subscribe(
      (res) => {
        this.orders = JSON.parse(JSON.stringify(res));
        this.allOrders = JSON.parse(JSON.stringify(res));
      },
      (error) => {
        console.error(error);
      }
    );

  }

  itemsToName(items) {
    let name = '';

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < items.length; i++) {
      if (name !== '') {
        name = name + ', ' + items[i].name;
      } else {
        name = items[i].name;
      }
    }
    return name;
  }

  loadOrder(order: any) {
    this.ORDER = order;
    console.log('This is order *********', this.ORDER);
    this.socket.emit('riders', this.ORDER.rider);
    if (this.ORDER.rider) {
      this.getRiderDetails(this.ORDER.rider.rider);
    }
  }

  getRiderDetails(riderId) {
    this.http.get(AppConstants.API.RIDERS + '/' + riderId, {headers: { Authorization: `Bearer ${AppConstants.token}`}}).subscribe(
      (res) => {
        console.log('Rider details', res);
        this.rider = JSON.parse(JSON.stringify(res));
      },
      (error) => {
        console.error(error);
      }
    );

  }

  copyToClipBoard(val) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snack.open('Order id copied to clipboard!');
  }

  filter(value) {
    if (value === undefined) {
      this.getOrders();
    } else {
      if (value.length > 2) {
        const momentDate = moment(value, 'M/DD/YYYY').format('MM-DD-YYYY');
        console.log(value);
        const f = this.status === 'All Orders' ? {date: momentDate} : {date: momentDate, status: this.status};
        this.orders = _.filter(this.allOrders, f);
      } else {
        if (this.status !== 'All Orders') {
          this.orders = _.filter(this.allOrders, {status: this.status});
        } else {
          this.getOrders();
        }
      }
    }


  }

  getColorByStatus(status) {
    if (status === 'PENDING') {
      return '#FF8A65';
    } else if (status === 'SCHEDULED') {
      return '#90A4AE';
    } else if (status === 'ASSIGNED DELIVERY') {
      return '#DCE775';
    } else if (status === 'PICKUP COMPLETE') {
      return '#7986CB';
    } else if (status === 'DROP COMPLETE') {
      return '#4FC3F7';
    } else if (status === 'PENDING') {
      return '#FF8A65';
    } else if (status === 'COMPLETE') {
      return '#81C784';
    } else if (status === 'FAILED') {
      return '#E57373';
    } else if (status === 'PAYMENT FAILED') {
      return '#FDD835';
    } else {
      return '#CE93D8';
    }
  }

  public getHumanShortDate(date) {
    return moment(date).format('DD-MMM-YYYY');
  }
}
