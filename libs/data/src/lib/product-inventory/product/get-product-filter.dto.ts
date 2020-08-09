import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductFilterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  search: string;
}
