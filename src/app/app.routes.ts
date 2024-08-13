import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { ProductMainComponent } from './products/product-main/product-main.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductMainComponent,
  },
];
