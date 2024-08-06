
import { EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';
import { response } from 'express';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjI5Mjk1OTQsImV4cCI6MTcyMzAxNTYyOSwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9NQU5BR0VSIl0sInVzZXJuYW1lIjoiZm9tZXJhdmNpQGdtYWlsLmNvbSJ9.BlwwCJrQCIL7tYGclHtVe5krh_bY3WdDZoQklVHGgmAQOG2CtJN101bbzqat1pp307JYGfGaWQChI4-vp3tSv-PzgWVNBJcnY9ZANKVzgsez_Ed_ZYcMU5dQGdqwM7bzl4fOHfreUPsDqFkogkU-QnohMBVX7VwiZLA-UX04OYGCdlaOrt_MO-39tnstqJK6nNzGC2lzeK8FIqKLCZDXYB1VStls5AD-hSw80Ek0O8zTEbHIbJunc9Vvt-Ky7SJnInKPRtkYBgPAudIGlVW0dheNcNK3y99XfRkeBFT6XnSUvlLmVS0D7NhpijhFJWsVE1dkpkp33lpVTAVUFzdemQ';
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
