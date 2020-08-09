import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async getProducts(
    getProductFilterDto: GetProductFilterDto
  ): Promise<Product[]> {
    return this.productRepository.getProducts(getProductFilterDto);
  }
}
