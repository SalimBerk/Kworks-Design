import { Component, OnInit,Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductMainComponent } from "./product-main/product-main.component";
import { PagetriggerService } from './pagetrigger.service';
import { FormsModule } from '@angular/forms';





@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ButtonModule, SidebarModule, ProductDetailComponent, ProductListComponent, ProductMainComponent,FormsModule]
})
export class AppComponent {
  title = 'AngularTutorialApp';



  constructor(public pageTrigger:PagetriggerService){


  }


}







