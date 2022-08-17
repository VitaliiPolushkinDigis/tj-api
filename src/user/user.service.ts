import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  findByEmail(cond: LoginUserDto) {
    return this.repository.findOneBy(cond);
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  async search(searchUserDto: SearchUserDto) {
    const qb = this.repository.createQueryBuilder('u');
    qb.limit(searchUserDto.limit || 10);
    qb.take(searchUserDto.take || 10);
    if (searchUserDto.views) {
      qb.orderBy('views', searchUserDto.views);
    }

    if (searchUserDto.fullName) {
      qb.andWhere(`u.fullName ILIKE :fullName`);
    }

    if (searchUserDto.email) {
      qb.andWhere(`u.email ILIKE :email`);
    }

    qb.setParameters({
      email: `%${searchUserDto.email}%`,
      fullName: `%${searchUserDto.fullName}%`,
    });

    const [posts, total] = await qb.getManyAndCount();

    return { posts, total };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
