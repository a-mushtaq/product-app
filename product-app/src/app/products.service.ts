import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class ProductsService {


  products=[];



  constructor(private http:HttpClient) { }

  _url='http://localhost:3000/products';
  _urlCat='http://localhost:3000/products/catalouge';
  _urlAddProd='http://localhost:3000/products/addProd';
  _urlDelProd='http://localhost:3000/products/delProd';
  _urlUpdatProd='http://localhost:3000/products/updateProd';
  _urlSearchProd='http://localhost:3000/products/search';


  getProducts():Observable<Product[]>
  {
    return this.http.get<Product[]>(this._url);
  }
  getCatalouge():Observable<Product[]>
  {
    return this.http.get<Product[]>(this._urlCat);
  }

  addProduct(product):Observable<JSON>
  {
    return this.http.post<JSON>(this._urlAddProd,product);
  }

  deleteProduct(id):Observable<JSON>
  {
    console.log(id);
    return this.http.delete<JSON>(this._urlDelProd+`/${id}`);
  }

  getOneProd(id):Observable<Product>
  {
    return this.http.get<Product>(`http://localhost:3000/products/one/${id}`);
  }

  updateProduct(prod):Observable<JSON>
  {
    return this.http.put<JSON>(this._urlUpdatProd,prod);
  }

  searchProduct(targetProduct):Observable<Product[]>
  {
    console.log(targetProduct);
    return this.http.post<Product[]>(this._urlSearchProd,{name:targetProduct});
  }
}

