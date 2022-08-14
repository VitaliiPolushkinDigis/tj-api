import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    return this.repository.save({
      text: createCommentDto.text,
      post: { id: createCommentDto.postId },
      user: { id: 1 },
    });
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException('Post not found!');
    }
    return find;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException('Post not found!');
    }
    return this.repository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException('Post not found!');
    }
    return this.repository.delete(id);
  }
}
