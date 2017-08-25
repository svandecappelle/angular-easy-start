import { Directive, Inject, ElementRef, Component, ContentChildren, QueryList } from '@angular/core';

// Helper component to add dynamic components
@Directive({
  selector: 'table-column'
})
export class TableColumn {
  innerHTML: string;

  constructor(@Inject(ElementRef) element: ElementRef) {
    this.innerHTML = element.nativeElement.innerHTML
  }
}

@Component({
  selector: 'table-columns',
  template: `
    <div innerHTML="{{item.innerHTML}}"></div>
  `
})
export class TableColumns {
  @ContentChildren(TableColumn) items: QueryList<TableColumn>
}
