
import { EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjE3MTgzODcsImV4cCI6MTcyMTgwNDQyMiwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9NQU5BR0VSIl0sInVzZXJuYW1lIjoiZm9tZXJhdmNpQGdtYWlsLmNvbSJ9.CAOPEtqBXtAKRntWmzPV7aPwW4JrwO5ujeAClNZbJg9C5FB8FIOtyeod28bgxZMXZevbh8O83zCSx1e_APxoYoo6o5-iIG9c6lC3TzSQZTpyyn6Qz0QWzaYCMVp9Ahqg-GT-rP01WJ6h8kl0yNS-ULWZ0Ipdn4QPe3cSJIVXQmPRQJjQ5dnqPIwb5XOsUc-jPy3Hz-A-RsXY6XWWlH1VQvK1c0c1G724kgn5fj4d5abe4Nry7p029OeRdlDWZvruixgpxGaBaDyIOpXZ-oBmGeFyz3pyDJqhyLgXG80gdP1Zk2cqjcc3s0FNe8ypFT0w4TUUDTouVTY62SmtakTzWw';
const headers = {
  Authorization: `Bearer ${token}`,
};
 let menuList:any[]=[];

@Injectable({
  providedIn: 'root'
})
export class PagetriggerService {
  @Output() dataChanged = new EventEmitter<boolean>();
  clicked:boolean=false;
  newMenuList:any[]=menuList;


  constructor() {
    axios.get('https://api.qapera.com/api/cook_books?pagination=true&itemsPerPage=20&page=1', { headers })
    .then(response => {

      response.data['hydra:member'].forEach((a:any) => {
        menuList.push(a);


      });







    })
    .catch(error => {
      console.error(error);
    });

   }


  getClickedData(){
    return this.clicked;
  }
  setClickedData(data:boolean){
     this.clicked=data;
  }
}
