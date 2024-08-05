import { Component, ElementRef, ErrorHandler, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {  SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { PagetriggerService } from '../pagetrigger.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';






@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ButtonModule,SidebarModule,PanelMenuModule,InputTextModule,DropdownModule,InputTextareaModule,ImageModule,TableModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',

})
export class ProductListComponent {


  countries: any[] | undefined;


  selectedCountry: string | undefined;


  items!: MenuItem[];
   display:boolean=true;
  clicked:boolean=false;
  imageUrl:string="https://qapera.com/wp-content/uploads/2021/05/qapera-logo.png";




  sidebarHoverState(){
    if(this.pagetrigger.clicked=true){
      this.isOpen();
    }

  }


  isOpen(){
    this.pagetrigger.clicked=!this.pagetrigger.clicked;

   const chanceSidebar:HTMLElement|null=document.querySelector('.p-sidebar');
   const chanceSidebarContent:HTMLElement|null=document.querySelector('.p-sidebar-content');
   const menuContent:HTMLElement|null=document.querySelector('.p-panelmenu-content');





    if (chanceSidebar && chanceSidebarContent) {
      if(this.pagetrigger.clicked==true){
        chanceSidebar.style.width = '90px';
        chanceSidebar.style.padding='0.5rem';
        this.imageUrl="assets/img/q-logo.png";
        chanceSidebarContent.style.width="1rem";

        if(menuContent){
          menuContent.style.display="none";
        }











      }
      else{

        chanceSidebar.style.width = '350px';

        this.imageUrl="https://qapera.com/wp-content/uploads/2021/05/qapera-logo.png";
        chanceSidebarContent.style.width="fit-content";
        if(menuContent){
          menuContent.style.display="block";
        }



      }

    }






  }





  constructor(private router: Router,public pagetrigger:PagetriggerService,@Inject(DOCUMENT) private document:Document) {



    this.items = [
      {
          label: 'DASHBOARD',
          icon: 'pi  pi-palette',

      },
      {
          label: 'Emirler',
          icon: 'pi pi-link',
          chev:'pi pi-angle-right',

      },
      {
          label: 'Edvanter',
          icon: 'pi pi-home',
          chev:'pi pi-angle-right',
          items: [
              {
                  label: 'Angular',
                  icon: 'pi pi-star',
                  url: 'https://angular.io/'
              },
              {
                  label: 'Vite.js',
                  icon: 'pi pi-bookmark',
                  url: 'https://vitejs.dev/'
              }
          ]
      },
      {
        label: 'Üretim',
        icon: 'pi pi-link',
        chev:'pi pi-angle-right',

      },


      {
        label: 'Emirler',
        icon: 'pi pi-link',
        chev:'pi pi-angle-right',

    },


  ];

  }



  ngOnInit() {


    let menuList:NodeListOf<HTMLElement>|null=document.querySelectorAll('.p-panelmenu-header-content');
    if(menuList){
      menuList.forEach((menu:HTMLElement)=>{
        menu.addEventListener('click',()=>{
          document.querySelector('.active')?.classList.remove('active');
          document.querySelector('.text-blue')?.classList.remove('text-blue');
          menu.classList.add('active');
          menu.children[0].classList.add('text-blue');
        })
       })
    }



}

}




