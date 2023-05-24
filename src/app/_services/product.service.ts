import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/Product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private globals: GlobalsService, private http: HttpClient) { }

getProducts() {
  return this.http.get(this.globals.serverUrl+"product/getall")
}

updateProduct(p: Product) {
  let payload = new FormData();
  payload.append("name", p.name)
  payload.append("Description", p.description)
  payload.append("PhotosJSON", JSON.stringify(p.photosJSON))
  payload.append("Price", p.price.toString())
  payload.append("ProductModelId", p.productModel.id)
  payload.append("ProductTypeId", p.productType.id)
  payload.append("IsActive", p.isActive.toString())

  return this.http.post(this.globals.serverUrl+"product/update/"+p.id, payload)
}

getById(id: string, route: string) {
  return this.http.get(this.globals.serverUrl+route+'/getById/'+id).pipe(
    map((response: any) => {
      const types = response;
      return types;
    })
  )
}


}
