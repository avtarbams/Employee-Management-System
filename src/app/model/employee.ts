export interface Employee {
    empId?: number;
    firstName: string;
    lastName: string;
    gender: 'Male' | 'Female';
    age: number;
    basicSalary: number;
    mealTransportAllowance: number;
    insurance: number;
    tax: number;
    netSalary: number;
  }
