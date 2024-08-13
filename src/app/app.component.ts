import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { FormsModule } from '@angular/forms';
import { ProductMainComponent } from './components/products/product-main/product-main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PagetriggerService } from './services/pagetrigger.service';
import { CommonModule } from '@angular/common';
import { DatasharingService } from './services/datasharing.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    SidebarComponent,
    ButtonModule,
    SidebarModule,
    CommonModule,

    ProductMainComponent,
    FormsModule,
  ],
})
export class AppComponent {
  title = 'AngularTutorialApp';
  isLoaded = false;

  constructor(public pageTrigger: PagetriggerService) {}
}
