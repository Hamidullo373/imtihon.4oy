import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from "@nestjs/common";
import { productController } from "./product.controller";
import { ProductService } from "./product.service";
import { PostgresService } from "src/database/db";
import { LoggerMiddleware } from "src/middleware";
import { FsHelper } from "src/helpers/fs.helper";

@Module({
    controllers:[productController],
    providers:[ProductService,PostgresService,FsHelper]
})

export class ProductModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(productController)
    }
}