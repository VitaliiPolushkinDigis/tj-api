import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.repository.save(createPostDto);
  }

  async popular() {
    const qb = this.repository.createQueryBuilder();
    qb.limit(10);
    qb.orderBy('views', 'DESC');
    const [posts, total] = await qb.getManyAndCount();
    return { posts, total };
  }

  async search(searchPostDto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder('p');
    qb.limit(searchPostDto.limit || 10);
    qb.take(searchPostDto.take || 10);
    if (searchPostDto.views) {
      qb.orderBy('views', searchPostDto.views);
    }

    if (searchPostDto.body) {
      qb.andWhere(`p.body ILIKE :body`);
    }

    if (searchPostDto.title) {
      qb.andWhere(`p.title ILIKE :title`);
    }

    if (searchPostDto.tag) {
      qb.andWhere(`p.tags ILIKE :tag`);
    }

    qb.setParameters({
      title: `%${searchPostDto.title}%`,
      body: `%${searchPostDto.body}%`,
      tag: `%${searchPostDto.tag}%`,
      views: searchPostDto.views || 'DESC',
    });

    const [posts, total] = await qb.getManyAndCount();

    return { posts, total };
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException('Post not found!');
    }
    await this.repository.increment({ id }, 'views', 1);
    return find;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException('Post not found!');
    }
    return this.repository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException('Post not found!');
    }
    return this.repository.delete(id);
  }
}
