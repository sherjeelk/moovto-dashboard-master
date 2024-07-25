import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { RiderListComponent } from './rider-list/rider-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatBadgeModule,
  MatListModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSelectModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AppConstants} from './AppConstants';
import { AgmCoreModule } from '@agm/core';
import { HeaderComponent } from './header/header.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {AlertModule} from 'ngx-alerts';
import { InputPopupComponent } from './input-popup/input-popup.component';
import {FormsModule} from '@angular/forms';
import { NotificationsComponent } from './notifications/notifications.component';

const config: SocketIoConfig = { url: 'https://www.easyshifters.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    RiderListComponent,
    HeaderComponent,
    DeliveriesComponent,
    InputPopupComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBadgeModule,
    NgxWebstorageModule.forRoot(),
    MatCardModule,
    MatListModule,
    MatNativeDateModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: AppConstants.API_KEY_MAP
    }),
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    AlertModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  entryComponents: [InputPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
