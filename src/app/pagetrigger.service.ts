
import { EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';
import { response } from 'express';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjMwNTM0NTAsImV4cCI6MTcyMzEzOTQ4NSwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9NQU5BR0VSIl0sInVzZXJuYW1lIjoiZm9tZXJhdmNpQGdtYWlsLmNvbSJ9.j0ftdwCk8xHc8zZJ4RGzZ_0rHN_ONEYcMX5CNhbcmzKSMMUPQPijLcaTn4l59dlNnRS88iqYqNYD-zCliQYDwEQvQV4aBzpE5JkX1KthOBzBBEc9pV5mfZt7o-YUxdj7HmjlZ1w_NxgQUCzYmYvPNof2Jin4WBsxn2DLmc8kL8VAdi4bShFlPnJvU4f9x6bGD2z2J0-E0HvHFpEiGIDNMIjPy6J71AzkeLk9oADeXFd-Bq1WrY1AxrYQzt8uRgimVHvY2o4mO6_J-Rh3XvbQGWv1HeTMMg3bcmj_ASbMnhQ57YWpa29ynLutOLej-GsCM86bzhqeFOyvaNhncQwUoA';
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
