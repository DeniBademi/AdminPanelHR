import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../_models/ProductModel';
import { ProductType } from '../_models/ProductType';
import { Currency } from '../_models/Currency';
import { Product } from '../_models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../_services/globals.service';
import { ProductService } from '../_services/product.service';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  productID: any;
  photos: GalleryItem[] = [];
  
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
        
  
          
          this.photos.push(new ImageItem({
            src: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.thumbnail,
            thumb: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.thumbnail
          }));
          //https://res.cloudinary.com/dvkjlgu83/image/upload/v1679592200/product-photos/5.40mm-compressed/Top%20Roller/250mm_5.4mm_2023-Mar-15_12-40-34PM-000_CustomizedView9730449655_juzc56.jpg
          for(let i=0;i<this.product.photosJSON.gallery.length;i++){
            
            this.photos.push(new ImageItem({
                src: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.gallery[i],
                thumb: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.gallery[i]
            }));
          }
  
        //   this.translate.get('demo.greeting', {name: 'John'}).subscribe((res: string) => {
        //     console.log(res);
        // });
          
        })
    })
  
  }

}
