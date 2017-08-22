import { ModuleWithProviders } from '@angular/core';

export interface User {
    id: string;
    username: string;
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}
