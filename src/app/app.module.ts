import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// tslint:disable-next-line:max-line-length
import { MatTableModule, MatSortModule, MatProgressSpinnerModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeTableComponent } from './component/employee-table/employee-table.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModalComponent } from './component/alert-modal/alert-modal.component';
import { EventEmitterServiceService } from './service/event-emitter-service.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    AddItemComponent,
    AlertModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [EventEmitterServiceService],
  bootstrap: [AppComponent],
  entryComponents: [AddItemComponent, AlertModalComponent]
})
export class AppModule { }
