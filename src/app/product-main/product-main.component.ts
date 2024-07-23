import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { AccordionModule } from 'primeng/accordion';
import { PagetriggerService } from '../pagetrigger.service';
import { StepperModule } from 'primeng/stepper';
import { ListboxModule } from 'primeng/listbox';
import { ProductListComponent } from '../product-list/product-list.component';
import { Console } from 'console';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';




interface gramList{
  name:string;
}
interface grossList{
  grossprice:number;
}
interface amountList{
  amountprice:number;
}

@Component({
  selector: 'app-product-main',
  standalone: true,
  imports: [ButtonModule,CardModule,DialogModule,PanelModule,TableModule,ImageModule,AccordionModule,StepperModule,ListboxModule,ProgressSpinnerModule],
  templateUrl: './product-main.component.html',
  styleUrl: './product-main.component.scss',
  animations:[
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})


export class ProductMainComponent   {


  grams!:gramList[];
  gross!:grossList[];
  amount!:amountList[];

  visible:boolean=false
  display: boolean = false;

  productTitle:string|undefined=''
  productDesc:string|undefined=''
  getName!:string;
  getImageUrl!:string;
  cookTime!:number;
  prepTime!:number;


  products: any[]=[];
  newMenulist!:any[];



  constructor(public pagetrigger:PagetriggerService ){



    this.grams=[{
      name:"10gr",

    },
    {
      name:"30gr",

    },
    {
      name:"50gr",

    },
    {
      name:"80gr",

    },
  ]
  this.gross=[{
    grossprice:10.00,

  },
  {
    grossprice:15.00,

  },
  {
    grossprice:29.00,

  },
  {
    grossprice:30.00,

  },
]
this.amount=[{
  amountprice:100.00,

},
{
  amountprice:450.00,

},
{
  amountprice:1450.00,

},
{
  amountprice:2400.00,

},
]
    this.newMenulist=pagetrigger.newMenuList;


  }





  detailPanel(id?:number){
     let getData=this.newMenulist.find(item=>item.id==id);



     this.getName=getData.name;
     this.getImageUrl=getData.image;
     this.cookTime=getData.cookTime;
     this.prepTime=getData.prepTime;
      this.display=true;


  }
  ngOnInit(): void {


    this.products.push({'maliyet':'271.14 TL','tavsiye':'840.00 TL','cost':'28.14 TL'})




  }

}
