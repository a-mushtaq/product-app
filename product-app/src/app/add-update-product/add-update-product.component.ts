import { Router } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {

  product={name:null,price:null,company:null};

  updateProd=false;

  constructor(private prodService:ProductsService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    
    if(this.route.snapshot.params.id!=':id')
     {
       this.fillForm(this.route.snapshot.params.id);
     }
  }

  addProduct()
  {
    console.log(this.product);
      this.prodService.addProduct(this.product).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(['/catalouge']);

        },
        err=>console.log(err)
      );
  }

  fillForm(id)
  {
      this.updateProd=true;
      this.prodService.getOneProd(id).subscribe(
        data=>{
          console.log(data)
          this.product=data;
        },
        err=>console.log(err)
      )
  }

  updateProduct(prod)
  {
    this.prodService.updateProduct(prod).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['/catalouge']);
      },
      err=>console.log(err)
    )
  }
}
