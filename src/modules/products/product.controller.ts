import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDuo } from './dtos/create-products';
import { updateProductDto } from './dtos/update-product.dto';
import { productParamsDuo } from './dtos/product.params';
import { GetAllProductsQueryDuo } from './dtos/product.params.dtos';
import { CheckFileSizePipe } from 'src/pipes/check.file.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileURLToPath } from 'node:url';

@Controller('products')
export class productController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(@Query() query: GetAllProductsQueryDuo) {
    return await this.productService.getAllProducts(query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() body: createProductDuo,
    @UploadedFile(new CheckFileSizePipe(1200000)) image: Express.Multer.File,
  ) {
    return await this.productService.createProduct(body, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Body() body: updateProductDto,
    @Param() param: productParamsDuo,
    @UploadedFile(new CheckFileSizePipe(120000)) image: Express.Multer.File,
  ) {
    return await this.productService.updateProduct(body, param?.id, image);
  }

  @Delete(':id')
  async deleteProduct(@Param() param: productParamsDuo) {
    return await this.productService.deleteProduct(param?.id);
  }
}
