import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../_models/ProductModel';
import { ProductType } from '../_models/ProductType';
import { Currency } from '../_models/Currency';
import { Product } from '../_models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../_services/globals.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  productID: any;
  
  constructor(private route: ActivatedRoute, private GlobalsService: GlobalsService, private products: ProductService, private router: Router) { }

  ngOnInit() {
      this.route.paramMap.subscribe( paramMap => {
        this.productID = paramMap.get('id');
        this.products.getById(this.productID, "product").subscribe( product => {
          
            console.log(product)
          this.product = new Product(product.id, 
            product.name,
            product.price,
            "", 
            product.description, 
            JSON.parse(product.photosJSON.replaceAll("'","\"")),
            new ProductModel(product.productModel.id, product.productModel.name),
            new ProductType(product.productType.id, product.productType.name),
            new Currency(1, "Leva", "лв", ""),
            product.isActive)
          //console.log(this.product)
        
  
  
        //   this.translate.get('demo.greeting', {name: 'John'}).subscribe((res: string) => {
        //     console.log(res);
        // });
          
        })
    })
  
  }

}
