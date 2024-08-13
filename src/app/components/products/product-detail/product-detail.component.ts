import { Component, ViewEncapsulation } from '@angular/core';
import { ImageModule } from 'primeng/image';
import {PanelModule} from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ImageModule,PanelModule,CardModule,ScrollPanelModule,DialogModule,ButtonModule,TableModule,AccordionModule,DataViewModule,CommonModule,TagModule,ButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',



})
export class ProductDetailComponent {
  visible:boolean=false
  productTitle:string|undefined=''
  productDesc:string|undefined=''
  products: any[]=[];

  display: boolean = false;

    showDialog() {
        this.display = true;
    }

  ngOnInit(): void {


    this.products.push({'maliyet':'271.14 TL','tavsiye':'840.00 TL','cost':'28.14 TL'})


  }




















}
