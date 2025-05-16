import { Type } from "class-transformer";
import { IsEnum, IsIn, IsInt, IsNumberString, IsOptional, IsPositive, IsString, } from "class-validator";

enum SortFields {
    name="name",
    price="price"
}

export class GetAllProductsQueryDuo {
    @IsOptional()
    @Type(()=>Number)
    @IsPositive()
    limit:number;

    @IsOptional()
    @Type(()=>Number)
    page:number;

    @IsOptional()
    @IsString()
    @IsEnum(SortFields)
    sortField:SortFields;

    @IsOptional()
    @IsIn(['asc','desc'])
    sortOrder:'asc'|'desc'
}