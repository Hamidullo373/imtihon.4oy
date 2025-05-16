import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model {
  @Column({})
  name: string;

  @Column({ unique: true })
  description: string;

  @Column({})
  price: string;

  @Column({})
  category: string;
}
