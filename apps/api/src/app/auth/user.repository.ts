import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '@artic-market/data';
import * as bcryptjs from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcryptjs.genSalt();

    const user = this.create();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException(error.detail);
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcryptjs.hash(password, salt);
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<string> {
    let userValidated = null;
    const { username, password } = authCredentialsDto;

    try {
      const user = await this.findOne({ username: username });
      console.log(user);
      if (user && (await user.validatePassword(password))) {
        userValidated = user.username;
      }
    } catch (error) {
      console.log(error);
    }

    return userValidated;
  }
}
