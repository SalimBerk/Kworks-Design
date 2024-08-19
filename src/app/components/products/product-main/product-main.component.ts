import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import axios, { Axios } from 'axios';
import { AccordionModule } from 'primeng/accordion';
import { Message, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { ImageModule } from 'primeng/image';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {
  StockInfo,
  amountList,
  gramList,
  grossList,
} from '../../../models/product-model';
import { PagetriggerService } from '../../../services/pagetrigger.service';
import { DatasharingService } from '../../../services/datasharing.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-main',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DialogModule,
    PanelModule,
    TableModule,
    ImageModule,
    AccordionModule,
    StepperModule,
    ListboxModule,
    ProgressSpinnerModule,
    SidebarModule,
    DropdownModule,
    CommonModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ProductListComponent,
  ],
  templateUrl: './product-main.component.html',
  styleUrl: './product-main.component.scss',
})
export class ProductMainComponent implements OnInit {
  loading: boolean;
  searchLoading: boolean = false; // State for loading indicator

  grams!: gramList[];
  gross!: grossList[];
  myForm!: FormGroup;
  amount!: amountList[];
  sidebarVisible: boolean = false;
  countries: any = [];
  visible: boolean = false;
  display: boolean = false;
  stocks: StockInfo[] = [];
  productTitle: string | undefined = '';
  productDesc: string | undefined = '';
  getName!: string;
  getImageUrl!: string;
  cookTime!: number;
  prepTime!: number;
  Specification!: boolean;
  originalValue!: number;
  messages!: Message[];
  newVariants: any[] = [];

  searchTerms: string = '';
  filteredProducts: any[] = [];
  private searchSubject = new Subject<string>();

  @ViewChild('inputElement') inputElement!: ElementRef;

  products: any[] = [];
  newMenulist: any = [];

  onVisibility() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onInputChange(event: any) {
    this.searchSubject.next(event);
  }

  onBlur(event: any) {
    const inputElement = event.target as HTMLInputElement;

    let id: number = parseInt(inputElement.id);
    let currentStock = this.stocks[id];
    currentStock.prescription_amount = parseFloat(inputElement.value);
  }

  idCounter: number = 0;

  addStock() {
    const newStock: StockInfo = {
      stockId: this.idCounter++,
      stock: undefined,
      unit: undefined,
      price: undefined,
      prescription_amount: 0.0,
      cost: 0.0,
    };
    this.stocks = [...this.stocks, newStock];
  }

  deleteStock() {
    this.stocks.pop();
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Form Successfuly',
      });
      this.myForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please change your mistakes',
      });
    }
  }

  constructor(
    public pagetrigger: PagetriggerService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dataSharingService: DatasharingService
  ) {
    this.myForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      preparedTime: ['', [Validators.required, Validators.maxLength(10)]],
      specification: ['', [Validators.required, Validators.maxLength(150)]],
      cookingTime: ['', [Validators.required]],
    });

    this.grams = [
      {
        name: '10gr',
      },
      {
        name: '30gr',
      },
      {
        name: '50gr',
      },
      {
        name: '80gr',
      },
    ];
    this.gross = [
      {
        grossprice: 10.0,
      },
      {
        grossprice: 15.0,
      },
      {
        grossprice: 29.0,
      },
      {
        grossprice: 30.0,
      },
    ];
    this.amount = [
      {
        amountprice: 100.0,
      },
      {
        amountprice: 450.0,
      },
      {
        amountprice: 1450.0,
      },
      {
        amountprice: 2400.0,
      },
    ];

    this.asyncListProducts();

    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          this.searchLoading = true;
          return this.pagetrigger.getProductsBySearch(searchTerm);
        })
      )
      .subscribe((filteredVariants) => {
        this.newMenulist = filteredVariants;
        this.searchLoading = false;
      });
  }

  detailPanel(id?: number) {
    let getData = this.newMenulist.find((item: any) => item.id == id);

    this.getName = getData.name;
    this.getImageUrl = getData.image;
    this.cookTime = getData.cookTime;
    this.prepTime = getData.prepTime;
    this.display = true;
  }
  // searchVariant = (event) => {
  //   this.http.get(CookBookStockModel.IRI, {name: event.query}).subscribe((response: StockModel) => {
  //     this.variants = response['hydra:member'];
  //   });
  // }
  searchVariant = async (event: any) => {
    this.newVariants = await this.pagetrigger.getProductsByFilter(event);
  };

  // onVariantSelect(event:Event, i:number): void {
  //   this.cookBook.items[i].cookBookStock = event;
  // }

  async asyncListProducts(): Promise<void> {
    this.newMenulist = await this.pagetrigger.getProducts();
    this.dataSharingService.changeData(this.newMenulist);
  }

  async ngOnInit(): Promise<void> {
    this.messages = [
      {
        severity: 'info',
        detail:
          'Yemek kitabı, listelenen malzemeler veya pişirme talimatları ile Menü Öğeleri için tarifleri görüntüler.',
      },
    ];

    this.pagetrigger.isLoading$.subscribe((loading) => {
      this.loading = loading;
      if (loading != true) {
      }
    });

    this.products.push({
      maliyet: '271.14 TL',
      tavsiye: '840.00 TL',
      cost: '28.14 TL',
    });

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
      { name: 'United States', code: 'US' },
    ];
  }
}
