/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "products";

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Add additional product fields here... */
  price: number;
}

export interface ProductDTO {
  name: string;
  description: string;
  /** Add additional product fields here... */
  price: number;
}

export interface CreateProductRequest {
  product: ProductDTO | undefined;
}

export interface ProductList {
  products: Product[];
}

export interface FindProductRequest {
  id: string;
}

export interface UpdateProductRequest {
  id: string;
  product: ProductDTO | undefined;
}

export interface DeleteProductRequest {
  id: string;
}

export interface Empty {
}

export const PRODUCTS_PACKAGE_NAME = "products";

export interface ProductServiceClient {
  createProduct(request: CreateProductRequest): Observable<Product>;

  findAllProducts(request: Empty): Observable<ProductList>;

  findOneProduct(request: FindProductRequest): Observable<Product>;

  updateProduct(request: UpdateProductRequest): Observable<Product>;

  deleteProduct(request: DeleteProductRequest): Observable<Empty>;
}

export interface ProductServiceController {
  createProduct(request: CreateProductRequest): Promise<Product> | Observable<Product> | Product;

  findAllProducts(request: Empty): Promise<ProductList> | Observable<ProductList> | ProductList;

  findOneProduct(request: FindProductRequest): Promise<Product> | Observable<Product> | Product;

  updateProduct(request: UpdateProductRequest): Promise<Product> | Observable<Product> | Product;

  deleteProduct(request: DeleteProductRequest): Promise<Empty> | Observable<Empty> | Empty;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createProduct",
      "findAllProducts",
      "findOneProduct",
      "updateProduct",
      "deleteProduct",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
