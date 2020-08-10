import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import { Product } from './product.entity';
import { User } from '../../auth/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDto, user);
  }

  async getProducts(
    getProductFilterDto: GetProductFilterDto,
    user: User
  ): Promise<Product[]> {
    return this.productRepository.getProducts(getProductFilterDto, user);
  }
}
