import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  // timestamps: true,
})
class Product extends Model<Product> {
  @Column({
    type: DataType.STRING(100),
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  availability!: number;
}

export default Product;

/**
 * Fixed the following warning:
 * type: DataType.FLOAT(6, 2) --> (sequelize) Warning: PostgreSQL does not support FLOAT with decimals. Plain `FLOAT` will be used instead.
 */
