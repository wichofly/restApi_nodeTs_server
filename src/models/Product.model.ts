import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  // timestamps: true,
})
class Product extends Model<Product> {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare availability: boolean;
}

export default Product;

/**
 * Fixed the following warning:
 * type: DataType.FLOAT(6, 2) --> (sequelize) Warning: PostgreSQL does not support FLOAT with decimals. Plain `FLOAT` will be used instead.
 */
