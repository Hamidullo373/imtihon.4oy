import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class createProductDuo {
    @IsString()
    @MinLength(4)
    name:string;

    @Type(()=>Number)
    @IsPositive()
    price:number;

    @Type(()=>Number)
    @IsPositive()
    category_id:number;
}