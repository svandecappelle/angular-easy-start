import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MdPaginatorIntl } from '@angular/material';

export class Paginator {
  /**
  * Stream that emits whenever the labels here are changed. Use this to notify
  * components if the labels have changed after initialization.
  */
 changes: Subject<void> = new Subject<void>();

 /** A label for the page size selector. */
 itemsPerPageLabel = 'Items par page:';

 /** A label for the button that increments the current page. */
 nextPageLabel = 'Page suivante';

 /** A label for the button that decrements the current page. */
 previousPageLabel = 'Page précédente';

 /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 sur ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} sur ${length}`;
  }
}
