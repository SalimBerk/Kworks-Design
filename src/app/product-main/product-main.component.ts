import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import axios, { Axios } from 'axios';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Transform } from 'stream';


interface StockInfo{
  stockId?:Number
  stock?:number,
  unit?:number,
  price?:number,
  prescription_amount?:number,
  cost:number
}

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
  imports: [ButtonModule,CardModule,DialogModule,PanelModule,TableModule,ImageModule,AccordionModule,StepperModule,ListboxModule,ProgressSpinnerModule,SidebarModule,DropdownModule,CommonModule,TagModule,FormsModule,ReactiveFormsModule,MessagesModule,ToastModule,AutoCompleteModule],
  templateUrl: './product-main.component.html',
  styleUrl: './product-main.component.scss',


})


export class ProductMainComponent  implements OnInit {



  grams!:gramList[];
  gross!:grossList[];
  myForm!:FormGroup
  amount!:amountList[];
  sidebarVisible: boolean=false;
  countries:any=[];
  visible:boolean=false
  display: boolean = false;
  stocks:StockInfo[]=[];
  productTitle:string|undefined=''
  productDesc:string|undefined=''
  getName!:string;
  getImageUrl!:string;
  cookTime!:number;
  prepTime!:number;
  Specification!:boolean;
  originalValue!:number;
  messages!: Message[];
  newVariants:any[]=[];

  @ViewChild('inputElement') inputElement!: ElementRef;

  products: any[]=[];
  newMenulist:any=[];


  onVisibility(){
    this.sidebarVisible=!this.sidebarVisible;

  }

  onBlur(event:any){
    console.log(event);

    const inputElement = event.target as HTMLInputElement;


    let id:number=parseInt(inputElement.id);
    let currentStock=this.stocks[id];
    currentStock.prescription_amount=parseFloat(inputElement.value);
    console.log(event);


  }





  idCounter:number = 0;


  addStock(){


    const newStock: StockInfo = {
      stockId:this.idCounter++,
      stock: undefined,
      unit: undefined,
      price:undefined,
      prescription_amount:0.00,
      cost:0.00,

    };
    this.stocks=[...this.stocks,newStock]


  }

  deleteStock(){
    this.stocks.pop();


  }
  onSubmit(){

    if (this.myForm.valid) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Successfuly' });
      this.myForm.reset();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please change your mistakes' });
    }

  }

  constructor(public pagetrigger:PagetriggerService,private fb:FormBuilder,private messageService: MessageService ){

    this.myForm=this.fb.group({
      name: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(50)]],
      preparedTime: ['', [Validators.required,Validators.maxLength(10)]],
      specification:['', [Validators.required,Validators.maxLength(150)]],
      cookingTime:['', [Validators.required]]

    })



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
    this.newMenulist= pagetrigger.getProducts();


  }





  detailPanel(id?:number){
     let getData=this.newMenulist.find((item:any)=>item.id==id);




     this.getName=getData.name;
     this.getImageUrl=getData.image;
     this.cookTime=getData.cookTime;
     this.prepTime=getData.prepTime;
      this.display=true;


  }
  // searchVariant = (event) => {
  //   this.http.get(CookBookStockModel.IRI, {name: event.query}).subscribe((response: StockModel) => {
  //     this.variants = response['hydra:member'];
  //   });
  // }
 searchVariant = async (event: any) => {

      this.newVariants= await this.pagetrigger.getProductsByFilter(event);
      console.log('variants',this.newVariants);



  }

  // onVariantSelect(event:Event, i:number): void {
  //   this.cookBook.items[i].cookBookStock = event;
  // }
   async ngOnInit():Promise<void> {
    this.newMenulist= await this.pagetrigger.getProducts();



    this.products.push({'maliyet':'271.14 TL','tavsiye':'840.00 TL','cost':'28.14 TL'})

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];


  }

}


