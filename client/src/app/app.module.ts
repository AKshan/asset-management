import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from  '@angular/forms';

import {HttpClientModule} from "@angular/common/http";
//import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { LayoutComponent } from './components/layout/layout.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddDeviceListComponent } from './components/layout/add-device-list/add-device-list.component';
import { AeInterfaceComponent } from './components/layout/ae-interface/ae-interface.component';
import { HeaderComponent } from './components/header/header.component';
import { EditInterfaceComponent } from './components/layout/edit-interface/edit-interface.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    OverviewComponent,
    AddDeviceListComponent,
    AeInterfaceComponent,
    HeaderComponent,
    EditInterfaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
