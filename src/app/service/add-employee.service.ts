import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../model/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {

  private newEmployeeDataSource = new Subject<Employee>();
  newEmployeeData = this.newEmployeeDataSource.asObservable();

  private updateEmployeeDataSource = new Subject<Employee>();
  updateEmployeeData = this.updateEmployeeDataSource.asObservable();


  apiUrl = 'https://hqgu4x10hd.execute-api.us-east-2.amazonaws.com/Prod/employee';

  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee) {
    try {
      const createResponse = this.http.post(this.apiUrl + '/create', employee);
      createResponse.subscribe(res => {
        if (res) {
        this.newEmployeeDataSource.next(employee);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  updateEmployee(employee: Employee) {
    try {
      const createResponse = this.http.post(this.apiUrl + '/update', employee);
      createResponse.subscribe(res => {
        if (res) {
        this.updateEmployeeDataSource.next(employee);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteEmployee(empId: object) {
    try {
      return this.http.post(this.apiUrl + '/delete', empId);
    } catch (error) {
      throw new Error(error);
    }
  }


  getEmployee() {
    try {
      return this.http.get<any>(this.apiUrl + '/getemployees');
    } catch (error) {
      throw new Error(error);
    }
  }


}
