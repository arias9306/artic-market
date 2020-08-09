import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Product } from '../product-inventory/products/product.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username:'postgres',
  password: '123456',
  database: 'ArticMarket',
  entities: [Product],
  synchronize: true,
  logging: 'all'
};
console.log(join(__filename));
console.log(join('/../**/*.entity{.ts,.js }'));
