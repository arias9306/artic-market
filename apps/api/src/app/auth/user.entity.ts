import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { Product } from '../product-inventory/products/product.entity';

@Entity({ schema: 'Security', name: 'User' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Index({ unique: true })
  @Column({ name: 'UserName', comment: 'user authentication name' })
  username: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'Salt' })
  salt: string;

  @OneToMany('Product', 'user', { eager: false })
  products: Product[];

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcryptjs.hash(password, this.salt);
    return hash === this.password;
  }
}
