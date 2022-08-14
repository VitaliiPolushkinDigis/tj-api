import { PartialType } from '@nestjs/mapped-types';
import { MinLength } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @MinLength(5)
  title: string;

  @MinLength(5)
  body: string;

  tags: string;
}
