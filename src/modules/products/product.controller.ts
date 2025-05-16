import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  CreateProductDto,
  GetAllProductsQueryDto,
  UpdateProductDto,
} from './dtos';
import { Protected, Roles } from '@decorators';
import { UserRoles } from './enums';

@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private service: ProductService) {}

  @ApiOperation({ summary: 'Barcha productlarni olish' })
  @Get()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async getAll(@Query() queries: GetAllProductsQueryDto) {
    return await this.service.getAll(queries);
  }

  @ApiOperation({ summary: 'Product yaratish' })
  @Post()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async create(@Body() payload: CreateProductDto) {
    return await this.service.create(payload);
  }

  @ApiOperation({ summary: 'Product yangilash' })
  @Patch(':id')
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  async update(
    @Body() payload: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.service.update(id, payload);
  }

  @ApiOperation({ summary: "Product o'chirish" })
  @Delete(':id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }
}
