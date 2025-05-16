import { ApiProperty } from '@nestjs/swagger';
import {
  // IsEmail,
  IsEnum,
  // IsInt,
  IsOptional,
  // IsPositive,
  IsString,
  // MaxLength,
  // Min,
  // MinLength,
} from 'class-validator';
import { UserRoles } from '../enums';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    enum: UserRoles,
    default: UserRoles.USER,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}
