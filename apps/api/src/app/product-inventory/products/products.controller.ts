import { GetProductFilterDto, CreateProductDto } from '@artic-market/data';
import {
  Controller,
  Get,
  Logger,
  Query,
  ValidationPipe,
  Post,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/user.entity';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(
    private readonly logger: Logger,
    private readonly productsService: ProductsService
  ) {
    this.logger.setContext(ProductsController.name);
  }

  @Get()
  getProducts(
    @Query(ValidationPipe) getProductFilterDto: GetProductFilterDto,
    @GetUser() user: User
  ): Promise<Product[]> {
    this.logger.verbose(
      `retrieving all products. Filters ${JSON.stringify(
        getProductFilterDto
      )}, username: ${user.username}`
    );
    return this.productsService.getProducts(getProductFilterDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User
  ): Promise<Product> {
    this.logger.verbose(
      `create product. Data ${JSON.stringify(createProductDto)}, username: ${
        user.username
      }`
    );
    return this.productsService.createProduct(createProductDto, user);
  }
}
