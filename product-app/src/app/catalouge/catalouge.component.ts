import { AddUpdateProductComponent } from './../add-update-product/add-update-product.component';
import { Router,Route } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-catalouge',
  templateUrl: './catalouge.component.html',
  styleUrls: ['./catalouge.component.css']
})
export class CatalougeComponent implements OnInit {

  constructor(private productService:ProductsService, private router:Router, private addUpd:AddUpdateProductComponent) { }
 


  products=[];
  product;
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts()
  {
    this.productService.getCatalouge().subscribe(data=>this.products=data,err=>console.log(err));
    
  }
  delProduct(id)
  {
    console.log(id);
    this.productService.deleteProduct(id).subscribe(
      data=>{
        console.log(data);
        window.location.reload();
      },
      err=> console.log(err)
      
    );
  }
  addUpdate(id)
  {
    this.router.navigate([`/addUpdate/${id}`])
  }

}
