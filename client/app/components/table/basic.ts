import { Component, Input } from '@angular/core';
import { TableComponent } from './table.component';

@Component({
  moduleId: module.id,
  selector: 'basic-table',
  template: '<app-table [options]="opts" service="/api/users" val="{{test}}"></app-table>',
})
export class BasicTable {

  test: string = "toto";

  opts = {
    schema: {
      columnsFlatten: ['id', 'username'],
      columns: [
        {
          id: 'id',
          name: 'ID'
        },
        {
          id: 'username',
          name: 'User'
        }
      ]
    }
  };

  constructor(private table: TableComponent) { }

}
