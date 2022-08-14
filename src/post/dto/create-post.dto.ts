import { MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(5)
  title: string;

  @MinLength(5)
  body: string;

  tags: string;
}
