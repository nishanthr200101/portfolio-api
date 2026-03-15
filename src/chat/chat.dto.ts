import { IsString, IsArray, IsOptional } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  role: 'user' | 'model';

  @IsString()
  text: string;
}

export class ChatRequestDto {
  @IsString()
  message: string;

  @IsArray()
  @IsOptional()
  history?: ChatMessageDto[];
}
