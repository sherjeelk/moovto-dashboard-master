import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from 'ngx-alerts';
import {MatDialog, MatSnackBar} from '@angular/material';
import {InputPopupComponent} from '../input-popup/input-popup.component';
import {AppConstants} from '../AppConstants';
import {SocketService} from '../socket.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rider-list',
  templateUrl: './rider-list.component.html',
  styleUrls: ['./rider-list.component.css']
})
export class RiderListComponent implements OnInit {

   riders = [];
   rider;
  style = AppConstants.styles;

  constructor(public socket: SocketService, private http: HttpClient, private alertService: AlertService,
              public snack: MatSnackBar, private dialog: MatDialog, private storage: LocalStorageService, private router: Router) { }


  ngOnInit() {
    const  login = this.storage.retrieve('login');
    AppConstants.token = this.storage.retrieve('token');
    if (!login) {
      this.router.navigateByUrl('/login');
    }
  }


  openRiderDetails(rider: any) {
    console.log('Rider details', rider);
    this.rider = rider;
  }

  assign(orderId) {
    this.socket.assignDelivery({
      rider: this.rider.id,
      order: orderId
    });
    this.alertService.success('Delivery assigned successfully to rider!');
  }

  openAssignDialogue() {
    const dialogRef = this.dialog.open(InputPopupComponent, {
      width: '500px',
      data: {title: 'Assign Delivery', value: '',
        content: 'Please enter delivery id which you would like to assign to this rider!', label: 'Delivery ID'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        this.orderDetails(result);
      }
    });
  }

  orderDetails(id) {
    console.log('GET ORDERS', {headers: { Authorization: `Bearer ${AppConstants.token}`}});
    this.http.get(AppConstants.API.ORDERS + '/' + id, {headers: { Authorization: `Bearer ${AppConstants.token}`}}).subscribe(
      (res) => {
        const order = JSON.parse(JSON.stringify(res));
        console.log('Status', order);
        if (order.status === 'PENDING' || order.status === 'SCHEDULED') {
          this.assign(id);
        } else {
         // this.snack.open('This order is already assigned!');
          this.alertService.danger('This order is already assigned!');
        }
      },
      (error) => {
        console.error(error);
      }
    );

  }

}
