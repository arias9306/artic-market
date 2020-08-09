import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'ProductInventory', name: 'Product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Name' })
  name: string;
}
