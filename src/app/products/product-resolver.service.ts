import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved> {

  //para obtener el dato via http
  constructor(private productService : ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<ProductResolved> { //el resolve se subscribe() automaticamente
    const id = route.paramMap.get('id');

    //sin error y con Observable<Product>
    // if(isNaN(+id)){
    //   const message = `Product id was not a number: ${id}`;
    //   console.error(message);
    //   return null;
    // }

    // return this.productService.getProduct(+id);

    if(isNaN(+id)){
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return null;
    }

    return this.productService.getProduct(+id)
    .pipe(
      map(product => ({product: product})),
      catchError(error=>{
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({product:null,error:message});
      })
    );

  }
}
