import {
  ChangeDetectorRef,
  EventEmitter,
  Injectable,
  Output,
} from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjM1MzUwNzIsImV4cCI6MTcyMzYyMTEwNywicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9NQU5BR0VSIl0sInVzZXJuYW1lIjoiZm9tZXJhdmNpQGdtYWlsLmNvbSJ9.mhWzCeZt9XRl7GOKxGs_x9G7mhQ9emEcVBDPjslE49onphjdg-wok-sOZyfS1EGaNKqWvI1-ejuELnVLbopDtBMG56-sJYgvRznrsaGm3pZD7q8Ms7BNUMDqVdaaA2_dXteMKD0Z3HI8Ot9lNww3P5A4UjTqlNtchs6dAFL31fxErCvKo4q2fDo9hsMjlanyNZTPg-s6NwIzrkEhnj7BJAeARv9EPu1aIxb0fCXF2LWATJplIwSqFBepxlqvF5zjRYvh5VRzsTjof2yXX2HO1qspnwunhwfg8HRNCe4jxj953ePrEvLqUIRjlxJek74rEBINkOGvB3-IAn9IyAqmHQ';
const headers = {
  Authorization: `Bearer ${token}`,
};
let menuList: any[] = [];
let variants: any[] = [];
let searchVariants: any[] = [];

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
