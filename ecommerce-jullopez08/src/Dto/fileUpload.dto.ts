import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class FileUploadDto {
  @ApiProperty({
    description: 'add an imagen',
    type: 'string',
    format: 'binary',
  })
  @IsString()
  @MaxLength(255)
  imgUrl?: string;
}
