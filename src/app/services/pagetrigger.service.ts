import {
  ChangeDetectorRef,
  EventEmitter,
  Injectable,
  Output,
} from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjQwNTQ3NDAsImV4cCI6MTcyNDE0MDc3NSwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9NQU5BR0VSIl0sInVzZXJuYW1lIjoiZm9tZXJhdmNpQGdtYWlsLmNvbSJ9.Tq9aSm9ovY-MXmDAvjR4_54C2zgQrtfRtHg23O_s3MYnrF8khH7G52SJj7aWbdI52VWUKiDJAbYwJp3i28lDKATr1ms1r8UQEEcr0zcaAezVYxOFiXHApLXIUqLOkuVfSpU0XwUUrw6Xg4_BoQ5c7ssHYIaB6KWQtXnjOpLUvf-SecLeYjtLIsU0CS3yz98Xa00roKhWtzJExgEjGXA8cB6H2HdnBl2yd5wwJwUvz9gbieIAybL1FaLIsleApgws_4LV6v-3MMeZgUJM43pbfLXO8vNxvSTgEPOONndr8ZhAVLi5_yDt1u1tkNlyMqAb__YD5FRPIu2ABfNitYvBvg';
const headers = {
  Authorization: `Bearer ${token}`,
};
let menuList: any[] = [];
let variants: any[] = [];
let searchVariants: any[] = [];
let items: any[] = [];

@Injectable({
  providedIn: 'root',
})
export class PagetriggerService {
  @Output() dataChanged = new EventEmitter<boolean>();
  clicked: boolean = false;
  visibility: boolean = false;
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();
  setLoading(loading: boolean): void {
    this.isLoadingSubject.next(loading);
  }

  constructor() {}

  async getProducts() {
    const response = await axios.get(
      'https://api.qapera.com/api/cook_books?pagination=true&itemsPerPage=20&page=1',
      { headers }
    );
    menuList = response.data['hydra:member'];
    if (menuList != null) {
      this.setLoading(false);
    }

    return menuList;
  }
  async getProductsByFilter(event: any): Promise<any> {
    await axios
      .get('https://api.qapera.com/api/cook_book_stocks', { headers })
      .then((response) => {
        variants = response.data['hydra:member'];
      });
    return variants;
  }
  async getProductsBySearch(event: string): Promise<any> {
    this.setLoading(true);
    const response = await axios.get(
      'https://api.qapera.com/api/cook_books?pagination=true&itemsPerPage=20&page=1',
      { headers }
    );

    searchVariants = response.data['hydra:member'];

    let filteredVariants = searchVariants.filter((value: any) => {
      console.log('Filtering:', value.name.toLowerCase(), event?.toLowerCase());
      return value.name.toLowerCase().includes(event?.toLowerCase());
    });
    if (filteredVariants != null) {
      this.setLoading(false);
    }
    return filteredVariants;
  }

  getClickedData() {
    return this.clicked;
  }
  setClickedData(data: boolean) {
    this.clicked = data;
  }
}
