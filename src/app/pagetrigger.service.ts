
import { ChangeDetectorRef, EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';


const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjM0NDg3MTIsImV4cCI6MTcyMzUzNDc0Nywicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9NQU5BR0VSIl0sInVzZXJuYW1lIjoiZm9tZXJhdmNpQGdtYWlsLmNvbSJ9.GugBuc6TdSIbEjYmKgWRJrnKZJfIvptBmWtBr8PRDg68TWpEjpPT07Z-bVGp2ieU6dLjITMAzAcCYKHhxa4q6hvyO4yryHjplEqtizp_aEgTXn7d8tUYS7XpBZlhvWV3iOZ17TnJmaZPVhpI-85ND97ajCt4RYvrGCkakCvtG-CRmTfOcm5T929wpozToNz2lwo-LsrnW5hvwp9hU6r7qNTgXtJy5VzU97CNPrNdkVarCCRQvZtVrTmxycYCTYparEiNaUcxO1nso1rWxJ1Ar-N401sKsbYASs_k1HCDAH0NRG6oUuNkGRl8ZI5Q1gD9zKqkSfe4Nb2qHu4RlXaLDg';
const headers = {
  Authorization: `Bearer ${token}`,
};
 let menuList:any[]=[];
 let variants:any[]=[];
 let searchVariants:any[]=[];



@Injectable({
  providedIn: 'root'
})
export class PagetriggerService {
  @Output() dataChanged = new EventEmitter<boolean>();
  clicked:boolean=false;
  visibility:boolean=false;
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();
  setLoading(loading: boolean): void {
    this.isLoadingSubject.next(loading);
  }


  constructor() {
   }

   async getProducts(){
     const response=await axios.get('https://api.qapera.com/api/cook_books?pagination=true&itemsPerPage=20&page=1', { headers })
    menuList=response.data['hydra:member'];
    if(menuList!=null){
      this.setLoading(false);
    }


    return menuList;

   }
   async getProductsByFilter(event:any):Promise<any>{
    await axios.get('https://api.qapera.com/api/cook_book_stocks', { headers}).then(response=>{
       variants = response.data['hydra:member'];


    });
    return variants;
   }
   async getProductsBySearch(event:string):Promise<any>{
    const response=await axios.get('https://api.qapera.com/api/cook_books?pagination=true&itemsPerPage=20&page=1', { headers});

    searchVariants=response.data['hydra:member'];


    let filteredVariants=searchVariants.filter((value:any)=>{
      return value.name.toLowerCase().includes(event?.toLowerCase());
    })
    console.log(filteredVariants);


   }


  getClickedData(){
    return this.clicked;
  }
  setClickedData(data:boolean){
     this.clicked=data;
  }
}
