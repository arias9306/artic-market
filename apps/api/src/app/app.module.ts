import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductInventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
