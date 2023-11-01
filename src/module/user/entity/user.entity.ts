import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Exclusion, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  //no api property as we don't want to expose the password
  @Column({ select: false })
  password: string;
}
