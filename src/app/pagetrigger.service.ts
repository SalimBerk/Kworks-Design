
import { EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';
import { response } from 'express';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjI4NTg4MTMsImV4cCI6MTcyMjk0NDg0OCwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9NQU5BR0VSIl0sInVzZXJuYW1lIjoiZm9tZXJhdmNpQGdtYWlsLmNvbSJ9.j1nAaupZOBK2edQ4AEGZvAllEtVMXNK15VDQg9qyWjpk-22OunkomnB-mwkwzQJueQDGpmVmDtHDZljbNVvQxNGib8JiFJUjSO0FGcscxKXir-REJYxFVsVm1m4NeOFMFbc8o_cIq9gJRzz9wTc4vl34dr2b1STDB-htyTjbwxb9kczKUN_UW73HPdeLZhLotPpTqV74Skdk278y2ixYvF5TbZD7NJUg4uyt9Jy1n9914OGmHOTV66NyMXyBoacrUb2oFG3RARjZL6xxkOb6QzWtJ4sNt3I07xKqWCjODlY4UYq39SCE7cr3at5zRK7JhI6_zLMu7qXE-HAiR9j6oQ';
const headers = {
  Authorization: `Bearer ${token}`,
};
 let menuList:any[]=[];
 let variants:any[]=[];



@Injectable({
  providedIn: 'root'
})
export class PagetriggerService {
  @Output() dataChanged = new EventEmitter<boolean>();
  clicked:boolean=false;
  visibility:boolean=false;


  constructor() {
   }

   async getProducts(){
     await axios.get('https://api.qapera.com/api/cook_books?pagination=true&itemsPerPage=20&page=1', { headers })
    .then(response => {
      response.data['hydra:member'].forEach((a:any) => {
        menuList.push(a);
      });



    })
    .catch(error => {
      console.error(error);
    });
    return menuList;

   }
   async getProductsByFilter(event:any):Promise<any>{
    await axios.get('https://api.qapera.com/api/cook_book_stocks', { headers}).then(response=>{
       variants = response.data['hydra:member'];


    });
    return variants;
   }


  getClickedData(){
    return this.clicked;
  }
  setClickedData(data:boolean){
     this.clicked=data;
  }
}
