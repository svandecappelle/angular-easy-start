import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-container',
  template: `<router-outlet><app-table>
  </app-table></router-outlet>`
})
export class AppComponent {

}
