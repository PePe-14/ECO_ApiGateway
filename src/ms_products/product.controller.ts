import { Body, Controller, Delete, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AddProductRequest, AddProductResponse, DeleteProductByIdRequest, DeleteProductByIdResponse, GetAllProductsResponse, ProductServiceClient, getProductByIdRequest, getProductByIdResponse } from './product.pb';
import { PRODUCT_SERVICE_NAME } from './product.pb';

@Controller('products')
export class ProductController implements OnModuleInit {
    private productService: ProductServiceClient;
    constructor(@Inject(PRODUCT_SERVICE_NAME) private client: ClientGrpc) {}

    onModuleInit() {
        this.productService = this.client.getService<ProductServiceClient>('ProductService');
    }

    @Get()
    getAllProducts(): Observable<GetAllProductsResponse> {
        const request = {};
        return this.productService.getAllProducts(request);
    }

    @Get('id')
    getProductById(@Body() id: getProductByIdRequest): Observable<getProductByIdResponse> {
        return this.productService.getProductById(id);
    }
 
    @Post()
    addProduct(@Body() body: AddProductRequest): Observable<AddProductResponse> {
        return this.productService.addProduct(body);
    } 

    @Delete()
    deleteProduct(@Body() id: DeleteProductByIdRequest): Observable<DeleteProductByIdResponse> {
        return this.productService.deleteProductById(id);
    }    

}