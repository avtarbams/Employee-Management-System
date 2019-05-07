import { Employee } from './employee';

export interface ModalAction {
    action: 'add' | 'modify';
    rowData: Employee;
}
