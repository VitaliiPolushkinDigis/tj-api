export class SearchUserDto {
  email?: string;
  fullName?: string;
  views?: 'DESC' | 'ASC';
  limit?: number;
  take?: number;
}
