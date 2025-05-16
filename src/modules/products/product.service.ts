import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models';
import {
  CreateProductDto,
  GetAllProductsQueryDto,
  UpdateProductDto,
} from './dtos';
import { Op } from 'sequelize';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async getAll(queries: GetAllProductsQueryDto) {
    let filters: any = {};

    if (queries.category) {
      filters.category = {
        [Op.eq]: queries.category,
      };
    }

    const { count, rows: products } = await this.productModel.findAndCountAll({
      limit: queries.limit || 10,
      offset: (queries.page - 1) * queries.limit || 0,
      order: queries.sortField
        ? [[queries.sortField, queries.sortOrder || 'DESC']]
        : null,
      where: { ...filters },
      attributes: queries.fields,
    });

    return {
      count,
      limit: queries.limit || 5,
      page: queries.page || 1,
      data: products,
    };
  }

  async create(payload: CreateProductDto) {
    const foundedProduct = await this.productModel.findOne({
      where: { name: payload.name },
    });

    if (foundedProduct) {
      throw new ConflictException('Bunday nomli mahsulot mavjud');
    }

    const product = await this.productModel.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      category: payload.category,
    });

    return {
      message: 'Mahsulot yaratildi',
      data: product,
    };
  }

  async update(id: number, payload: UpdateProductDto) {
    const foundedProduct = await this.productModel.findByPk(id);

    if (!foundedProduct) {
      throw new ConflictException('Mahsulot topilmadi');
    }

    const [count, [updatedProduct]] = await this.productModel.update(
      {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        category: payload.category,
      },
      { where: { id }, returning: true },
    );

    return {
      message: 'Mahsulot yangilandi',
      data: updatedProduct,
    };
  }

  async delete(id: number) {
    const foundedProduct = await this.productModel.findByPk(id);

    if (!foundedProduct) throw new NotFoundException('Mahsulot topilmadi');

    await this.productModel.destroy({ where: { id } });

    return {
      message: "Mahsulot o'chirildi",
      data: foundedProduct,
    };
  }

  async seedProducts() {
    const defaultProducts = [
      {
        name: 'Example Product',
        description: 'Misol uchun mahsulot',
        price: 100,
        category: 'General',
      },
    ];

    for (let product of defaultProducts) {
      const foundedProduct = await this.productModel.findOne({
        where: { name: product.name },
      });

      if (!foundedProduct) {
        await this.productModel.create(product);
      }
    }

    console.log('Mahsulotlar bazasi tayyorlandi ✅');
  }
}
