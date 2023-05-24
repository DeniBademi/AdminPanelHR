import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  serverUrl = "https://localhost:5001/"
  productPhotosMediaURLs= 'https://res.cloudinary.com/dvkjlgu83/image/upload/v1679592200/product-photos/';

constructor() { }

}
