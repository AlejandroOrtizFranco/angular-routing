import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService, private route:ActivatedRoute) { }
  ngOnInit(): void {
    //esto ya no es necesario por el resolver
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.getProduct(id);

    //reading resolvers data with observables
    const resolvedData : ProductResolved = this.route.snapshot.data['resolvedData']; //usamos el key
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
