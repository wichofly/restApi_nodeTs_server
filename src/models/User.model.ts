import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import bcrypt from 'bcrypt';

@Table({
  tableName: 'users',
})
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    unique: true,
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  // hash password before saving, passwords are never saved in plain text.
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;
