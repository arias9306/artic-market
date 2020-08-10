import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';

@Entity({ schema: 'ProductInventory', name: 'Product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Name' })
  name: string;

  // @Column({ name: 'UserId' })
  // userId: number;

  @ManyToOne('User', 'products', { eager: false, nullable: false })
  @JoinColumn({ name: 'UserId' })
  user: User;
}
