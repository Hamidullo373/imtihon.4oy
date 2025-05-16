import { Type } from "class-transformer";
import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class updateProductDto {
    @IsString()
    @MinLength(4)
    name:string;

    @Type(()=>Number)
    @IsPositive()
    price:number;
}