import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  ErrorHandler,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { PagetriggerService } from '../../services/pagetrigger.service';
import { DatasharingService } from '../../services/datasharing.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    SidebarModule,
    PanelMenuModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    ImageModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SkeletonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  countries: any[] | undefined;
  productList: any[];

  selectedCountry: string | undefined;

  items!: MenuItem[];
  display: boolean = true;
  clicked: boolean = false;
  imageUrl: string =
    'https://qapera.com/wp-content/uploads/2021/05/qapera-logo.png';

  sidebarHoverState() {
    if ((this.pagetrigger.clicked = true)) {
      this.isOpen();
    }
  }

  isOpen() {
    this.pagetrigger.clicked = !this.pagetrigger.clicked;

    const chanceSidebar: HTMLElement | null =
      document.querySelector('.p-sidebar');
    const chanceSidebarContent: HTMLElement | null =
      document.querySelector('.p-sidebar-content');
    const menuContent: HTMLElement | null = document.querySelector(
      '.p-panelmenu-content'
    );

    if (chanceSidebar && chanceSidebarContent) {
      if (this.pagetrigger.clicked == true) {
        chanceSidebar.style.width = '80px';
        chanceSidebar.style.padding = '0.5rem';
        this.imageUrl = 'assets/img/q-logo.png';
        chanceSidebarContent.style.width = '1rem';
        chanceSidebarContent.style.paddingRight = '64px';
        chanceSidebarContent.style.paddingLeft = '20px';
        chanceSidebarContent.style.paddingBottom = '20px';

        if (menuContent) {
          menuContent.style.display = 'none';
        }
      } else {
        chanceSidebar.style.width = '250px';
        chanceSidebarContent.style.padding = '0px';
        this.imageUrl =
          'https://qapera.com/wp-content/uploads/2021/05/qapera-logo.png';
        chanceSidebarContent.style.width = 'fit-content';
        if (menuContent) {
          menuContent.style.display = 'block';
        }
      }
    }
  }
  clickedNumber: number = -1;
  helper() {
    this.clickedNumber++;
    var helpCloud: HTMLDivElement | null =
      this.document.querySelector('.help-cloud');
    var pPanelMenu: HTMLDivElement | null =
      this.document.querySelector('.p-panelmenu');
    console.log(this.clickedNumber);
    if (pPanelMenu && helpCloud) {
      helpCloud.style.cssText =
        'display:block; position:absolute;  width:80px;  padding:1.1rem; text-align:center; color:black; overflow:visible; color:#00b4d2;';
      var pChildren = pPanelMenu.children;
      if (this.clickedNumber < pChildren.length - 1) {
        helpCloud.style.cssText += `top:${
          pChildren[this.clickedNumber].getBoundingClientRect().top
        }px; right:${
          pChildren[this.clickedNumber].getBoundingClientRect().left + 100
        }px;`;
        console.log(helpCloud);
      } else {
        helpCloud.style.cssText += 'display:none;';
        this.clickedNumber = -1;
      }

      // switch(this.clickedNumber){
      //   case 0:
      //     helpCloud.style.cssText+=`top:${pChildren[0].getBoundingClientRect().top}px; right:${pChildren[0].getBoundingClientRect().left+120}px;`;
      //     console.log(helpCloud)
      //     break;
      //   case 1:
      //       helpCloud.style.cssText+=`top:${pChildren[1].getBoundingClientRect().top}px; right:${pChildren[1].getBoundingClientRect().left+120}px;`;
      //       console.log(helpCloud)
      //       break;
      //   default:
      //     helpCloud.style.cssText+=`display:none`;
      //     console.log(helpCloud)
      // }
    }
  }

  constructor(
    private router: Router,
    public pagetrigger: PagetriggerService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataSharingService: DatasharingService
  ) {
    dataSharingService.currentData.subscribe((value: any) => {
      this.productList = value;
    });

    this.items = [
      {
        label: 'DASHBOARD',
        icon: 'pi  pi-palette',
      },
      {
        label: 'Emirler',
        icon: 'pi pi-link',
        chev: 'pi pi-angle-right',
      },
      {
        label: 'Edvanter',
        icon: 'pi pi-home',
        chev: 'pi pi-angle-right',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-star',
            url: 'https://angular.io/',
          },
          {
            label: 'Vite.js',
            icon: 'pi pi-bookmark',
            url: 'https://vitejs.dev/',
          },
        ],
      },
      {
        label: 'Üretim',
        icon: 'pi pi-link',
        chev: 'pi pi-angle-right',
      },

      {
        label: 'Emirler',
        icon: 'pi pi-link',
        chev: 'pi pi-angle-right',
      },
    ];
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let menuList: NodeListOf<HTMLElement> | null =
        this.document.querySelectorAll('.p-panelmenu-header-content');
      if (menuList) {
        menuList.forEach((menu: HTMLElement) => {
          menu.addEventListener('click', () => {
            this.document.querySelector('.active')?.classList.remove('active');
            this.document
              .querySelector('.text-blue')
              ?.classList.remove('text-blue');
            menu.classList.add('active');
            menu.children[0].classList.add('text-blue');
          });
        });
      }
    }
  }
}
