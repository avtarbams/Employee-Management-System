import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalAction } from 'src/app/model/modalAction';
import { EventEmitterServiceService } from 'src/app/service/event-emitter-service.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  constructor(public modalReference: MatDialogRef<AlertModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private eventEmitterService: EventEmitterServiceService) { }

  employeeId = this.data.empId;

  ngOnInit() {
  }

  // Cancel Button Click Event Function
  cancel() {
    this.modalReference.close();
  }

  // Delete Button Click Event Function
  delete() {
    this.eventEmitterService.onButtonClickedFromAlert(this.employeeId);
    this.modalReference.close();
  }

}
