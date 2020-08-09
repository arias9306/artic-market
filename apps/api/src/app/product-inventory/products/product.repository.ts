import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from '@artic-market/data';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRespository extends Repository<Product> {

  private logger = new Logger();

  async createProduct(createProductDto: CreateProductDto) {

    const product = this.create();
    product.name = createProductDto.name;

    try {
      await product.save();
    } catch (error) {
      this.logger.error(`Failed to create product, Data: ${JSON.stringify(createProductDto)}`, error.stack);
      throw new InternalServerErrorException('Failed to create product.');
    }

    return product;

  }
}
