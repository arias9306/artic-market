import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../product-inventory/products/product.entity';
import { User } from '../auth/user.entity';
import { CustomNamingStrategy } from './custom-naming.strategy';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'ArticMarket',
  entities: [Product, User],
  synchronize: true,
  //logging: 'all',
  namingStrategy: new CustomNamingStrategy(),
};
