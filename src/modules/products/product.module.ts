import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models';
import { JwtService } from '@nestjs/jwt';
import { FsHelper, JwtHelper } from 'src/helpers';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [JwtService, JwtHelper, ProductService, FsHelper],
})
export class ProductModule {}
