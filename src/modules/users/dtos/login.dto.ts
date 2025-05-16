import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    minLength: 4,
    maxLength: 15,
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  password: string;
}
