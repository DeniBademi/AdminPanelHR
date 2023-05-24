import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalsService } from '../_services/globals.service';
import { map } from 'rxjs';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  baseUrl = "https://localhost:5001/";
  pageSize: any = "100";
  totalPages: any = "100";
  currentPage: any = "1";

  filters: any = {};
  types: any;
  brands: any;
  sizes: any;
  direction: any = "arrow_downward"
  private currentProduct: Product | undefined;
  typesLoaded: boolean = false;
  productList: Product[] = [];

  constructor(private products: ProductService, private http: HttpClient, private globals: GlobalsService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get(this.globals.serverUrl+'product/getAll', 
    {
      observe: 'response',
      params: new HttpParams().set("pageNumber", this.currentPage)
                              .set("pageSize", this.pageSize)
                              .set("orderBy", this.filters.orderBy)
                              .set("filters", JSON.stringify(this.filters))
                              .set("direction", this.direction=="arrow_downward" ? "asc" : "desc")
    }).pipe(
      map((response: any) => {
        const types = response;
        console.log(response)
        return types;
      })
    ).subscribe(response => {

      this.typesLoaded=true;
      this.productList = response.body;
      for(let i=0;i<this.productList.length;i++) {
        this.productList[i].photosJSON = JSON.parse(this.productList[i].photosJSON.replaceAll("'","\""))
      }

      var pag = JSON.parse(response.headers.get("Pagination"))
      this.totalPages = String(pag["TotalItems"])
    }, error => {
      console.log(error.error);
    })
  }

  changeStatus(product: Product) {
    product.isActive = !product.isActive;
    let toSend= structuredClone(product);
    toSend.photosJSON = JSON.stringify(toSend.photosJSON)
    this.products.updateProduct(product).subscribe(res => {
      console.log(res);
      this.getProducts();
    })

  }

}
