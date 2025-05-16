import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class productParamsDuo {
    @Type(()=>Number)
    @IsPositive()
    id:number;
}