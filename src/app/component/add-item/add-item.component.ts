import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { AddEmployeeService } from 'src/app/service/add-employee.service';
import { MatDialogRef } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ModalAction } from 'src/app/model/modalAction';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addRecordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private addEmployeeService: AddEmployeeService,
              public modalReference: MatDialogRef<AddItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ModalAction) { }

  ngOnInit() {
    // Pre-populate data from Row
    if (this.data.rowData) {
      this.addRecordForm = this.formBuilder.group({
        firstName: [this.data.rowData.firstName, [Validators.required]],
        lastName: [this.data.rowData.lastName, [Validators.required]],
        gender: [this.data.rowData.gender, [Validators.required]],
        age: [this.data.rowData.age, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
        basicSalary: [this.data.rowData.basicSalary, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]],
        // tslint:disable-next-line:max-line-length
        mealTransportAllowance: [this.data.rowData.mealTransportAllowance, [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]],
        insurance: [this.data.rowData.insurance,  [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]],
        tax: [this.data.rowData.tax,  [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]],
        netSalary: [this.data.rowData.netSalary,  [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]]
      });
    } else {
      this.addRecordForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        gender: ['Male', [Validators.required]],
        age: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
        basicSalary: ['', [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]],
        mealTransportAllowance: ['',  [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]],
        insurance: ['',  [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]],
        tax: ['',  [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]],
        netSalary: ['',  [Validators.required, Validators.pattern(/^[0-9]\d*(\.\d{1,2})?$/)]]
      });
    }

  }

  // close modal button click event function
  closeModal() {
    this.modalReference.close();
  }

  // add new employee click event function
  addEmployee() {
    this.addEmployeeService.addEmployee(this.addRecordForm.value);
  }

  // modify button click event function
  modifyEmployee() {
    const newData = {
      empId: this.data.rowData.empId,
      firstName: this.addRecordForm.value.firstName,
      lastName: this.addRecordForm.value.lastName,
      gender: this.addRecordForm.value.gender,
      age: this.addRecordForm.value.age,
      basicSalary: this.addRecordForm.value.basicSalary,
      mealTransportAllowance: this.addRecordForm.value.mealTransportAllowance,
      insurance: this.addRecordForm.value.insurance,
      tax: this.addRecordForm.value.tax,
      netSalary: this.addRecordForm.value.netSalary
    };
    this.addEmployeeService.updateEmployee(newData);
  }

  // String Interpolation function for Header Generation
  generateEmployeeFormHeader() {
    switch (this.data.action) {
      case 'add':
       return 'Add New Employee Details';
       break;
      case 'modify':
       return `Modify Employee Details of ${this.data.rowData.firstName} ${this.data.rowData.lastName}`;
       break;
      default :
        return 'Add New Employee Details';
    }
  }

  // Getters to simplify usage in directives
  get firstName() {
    return this.addRecordForm.get('firstName');
  }

  get lastName() {
    return this.addRecordForm.get('lastName');
  }

  get gender() {
    return this.addRecordForm.get('gender');
  }

  get age() {
    return this.addRecordForm.get('age');
  }

  get basicSalary() {
    return this.addRecordForm.get('basicSalary');
  }

  get mealTransportAllowance() {
    return this.addRecordForm.get('mealTransportAllowance');
  }

  get insurance() {
    return this.addRecordForm.get('insurance');
  }

  get tax() {
    return this.addRecordForm.get('tax');
  }

  get netSalary() {
    return this.addRecordForm.get('netSalary');
  }



  callchange() {
    console.log(this.addRecordForm);
  }

  // Utility function to generate error messages
  getErrorMessageForFirstName() {
    return 'You must enter first Name';
  }

  getErrorMessageForLastName() {
    return 'You must enter last Name';
  }

  getErrorMessageForAge() {
    return this.age.errors.required ? 'You must enter a value' :
    this.age.errors.requiredPattern !== null ? `Please enter valid Age` :
            '';
  }

  getErrorMessageForBasicSalary() {
    return this.basicSalary.errors.required ? 'You must enter a value' :
    this.basicSalary.errors.requiredPattern !== null ? `Please enter valid Basic Salary` :
            '';
  }

  getErrorMessageForAllowance() {
    return this.mealTransportAllowance.errors.required ? 'You must enter a value' :
    this.mealTransportAllowance.errors.requiredPattern !== null ? `Please enter valid Allowance` :
            '';
  }

  getErrorMessageForInsurance() {
    return this.insurance.errors.required ? 'You must enter a value' :
    this.insurance.errors.requiredPattern !== null ? 'Please enter valid Insurance' :
            '';
  }

  getErrorMessageForTax() {
    return this.tax.errors.required ? 'You must enter a value' :
    this.tax.errors.requiredPattern !== null ? `Please enter valid Tax` :
            '';
  }

  getErrorMessageForNetSalary() {
    return this.netSalary.errors.required ? 'You must enter a value' :
    this.netSalary.errors.requiredPattern !== null ? `Please enter valid Net Salary` :
            '';
  }

}
