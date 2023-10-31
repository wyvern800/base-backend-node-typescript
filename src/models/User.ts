import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  role!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;
}

export default User;
