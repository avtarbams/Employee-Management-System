import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { Employee } from 'src/app/model/employee';
import { AddEmployeeService } from 'src/app/service/add-employee.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { EventEmitterServiceService } from 'src/app/service/event-emitter-service.service';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {

  constructor(private addEmployeeService: AddEmployeeService, private materialDialog: MatDialog,
              private eventEmitterService: EventEmitterServiceService, private snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['empId', 'firstName', 'lastName', 'gender', 'age', 'basicSalary',
                               'mealTransportAllowance', 'insurance', 'tax', 'netSalary', 'actions'];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    console.log(this.dataSource);
    this.fetchEmployees();
    // subscribe callbacks received from another components
    this.addEmployeeService.newEmployeeData.subscribe(data => this.addEmployeeFromForm(data));
    this.addEmployeeService.updateEmployeeData.subscribe(data => this.updateEmployeeFromForm(data));
    this.eventEmitterService.callInvokeFromAlert.subscribe(data => this.deleteFromModal(data));
  }


  // async function to call fetch api from add-employee-service
  async fetchEmployees() {
    await this.addEmployeeService.getEmployee().subscribe(employees => {
      this.dataSource  = new MatTableDataSource(employees);
      this.dataSource.sort = this.sort;
    });
  }


  // edit employee button click event function
  onModify(row) {
    const modelConfig = new MatDialogConfig();
    modelConfig.autoFocus = true;
    modelConfig.width = '60%';
    modelConfig.data = {action: 'modify', rowData: row};
    this.materialDialog.open(AddItemComponent, modelConfig);
  }


  // delete button click event function
  onDelete(empId) {
    const modelConfig = new MatDialogConfig();
    modelConfig.autoFocus = false;
    modelConfig.width = '30%';
    modelConfig.data = {empId};
    this.materialDialog.open(AlertModalComponent, modelConfig);
  }


  // callback from alert-modal component
  deleteFromModal(empId) {
    const empIdObject = {empId};
    this.addEmployeeService.deleteEmployee(empIdObject).subscribe(res => {
      if (res) {
        const index = this.dataSource.data.findIndex((obj => obj.empId === empId));
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.openSnackBar(`Employee ${empId} deleted successfully`, 'Deleted');
      }
    });
  }


  // callback invoked from add-item component(create)
  addEmployeeFromForm(data: Employee) {
    this.openSnackBar('New Employee Created successfully', 'Created');
    // fetch updated employees
    this.fetchEmployees();
  }


  // callback invoked from add-item component(modify)
  updateEmployeeFromForm(data: Employee) {
    const index = this.dataSource.data.findIndex((obj => obj.empId === data.empId));
    this.dataSource.data.splice(index, 1, data);
    this.dataSource._updateChangeSubscription();
    this.openSnackBar(`Employee ${data.empId} updated successfully`, 'Updated');
  }


  // create employee button function to open add-item component in modal
  onCreate() {
    const modelConfig = new MatDialogConfig();
    modelConfig.autoFocus = true;
    modelConfig.width = '60%';
    modelConfig.data = {action: 'add'};
    this.materialDialog.open(AddItemComponent, modelConfig);
  }

  // Utility function generate SnackBar Messages
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition : 'center',
      verticalPosition : 'bottom'
    });
  }

}
