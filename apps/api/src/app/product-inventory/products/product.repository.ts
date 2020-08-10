import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { User } from '../../auth/user.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger();

  async createProduct(createProductDto: CreateProductDto, user: User) {
    const product = this.create();
    product.name = createProductDto.name;
    product.user = user;

    try {
      await product.save();
    } catch (error) {
      this.logger.error(
        `Failed to create product, Data: ${JSON.stringify(createProductDto)}`,
        error.stack
      );
      throw new InternalServerErrorException('Failed to create product.');
    }
    delete product.user;
    return product;
  }

  async getProducts(
    getProductFilterDto: GetProductFilterDto,
    user: User
  ): Promise<Product[]> {
    const query = this.createQueryBuilder('product');

    query.where('product.userId = :userId', { userId: user.id });

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
