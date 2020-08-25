import { ProductsService } from './../products.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products=[];

  targetProduct;

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts()
  {
    this.productService.getProducts().subscribe(data=>this.products=data);
  }

  getProductsNow()
  {
    return this.products;
  }

  searchProducts()
  {
    this.productService.searchProduct(this.targetProduct).subscribe(
      data=>{
        this.products=data;
      },
      err=>console.log(err)
    );
  }
}
