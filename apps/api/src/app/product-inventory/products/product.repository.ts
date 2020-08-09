import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger();

  async createProduct(createProductDto: CreateProductDto) {
    const product = this.create();
    product.name = createProductDto.name;

    try {
      await product.save();
    } catch (error) {
      this.logger.error(
        `Failed to create product, Data: ${JSON.stringify(createProductDto)}`,
        error.stack
      );
      throw new InternalServerErrorException('Failed to create product.');
    }
    return product;
  }

  async getProducts(
    getProductFilterDto: GetProductFilterDto
  ): Promise<Product[]> {
    const query = this.createQueryBuilder('product');

    if (getProductFilterDto.search) {
      query.andWhere('product.name LIKE :name', {
        name: `%${getProductFilterDto.search}%`,
      });
    }
    let products = [];
    try {
      products = await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get products, Filters: ${JSON.stringify(
          getProductFilterDto
        )}`,
        error.stack
      );
      throw new InternalServerErrorException('Failed to get products.');
    }

    return products;
  }
}
